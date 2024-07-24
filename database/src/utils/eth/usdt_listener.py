from web3 import Web3
from web3.middleware import geth_poa_middleware
import asyncio
from ...database import SessionLocal
from ...models.credit import CreditBalance, UserWallet
from .w3 import w3

# USDT contract address on Ethereum mainnet
# USDT_CONTRACT_ADDRESS = "0xdAC17F958D2ee523a2206206994597C13D831ec7"
ERC20_CONTRACT_ADDRESS = Web3.to_checksum_address(
    "0xfFf9976782d46CC05630D1f6eBAb18b2324d6B14"
)  # sepolia WETH

# ABI for the transfer event of the USDT contract
TRANSFER_ABI = {
    "anonymous": False,
    "inputs": [
        {"indexed": True, "name": "from", "type": "address"},
        {"indexed": True, "name": "to", "type": "address"},
        {"indexed": False, "name": "value", "type": "uint256"},
    ],
    "name": "Transfer",
    "type": "event",
}

w3.middleware_onion.inject(geth_poa_middleware, layer=0)

usdt_contract = w3.eth.contract(address=ERC20_CONTRACT_ADDRESS, abi=[TRANSFER_ABI])


async def handle_erc20_transfer_event(event):
    to_address = event["args"]["to"]
    value = event["args"]["value"]
    print(f"[usdt_listener.handle_event] to_address: {to_address}, value: {value}")
    return {
        "WS_EVENT": "ERC20_LISTENER.HANDLE_ERC20_TRANSFER_EVENT",
        "to_address": to_address,
        "value": value,
    }

    db = SessionLocal()
    try:
        user_wallet = (
            db.query(UserWallet).filter(UserWallet.wallet_address == to_address).first()
        )
        if user_wallet:
            credit_balance = (
                db.query(CreditBalance)
                .filter(CreditBalance.user_id == user_wallet.user_id)
                .first()
            )
            if credit_balance:
                # USDT has 6 decimal places, so divide by 1e6 to get the actual amount
                credit_amount = value / 1e18  # change for USDT to 1e6
                print(
                    f"[usdt_listener.handle_event] adding credit_amount: {credit_amount} credits to user {user_wallet.user_id}"
                )
                credit_balance.add_credits(credit_amount)
                db.commit()
                print(
                    f"[usdt_listener.handle_event] Added {credit_amount} credits to user {user_wallet.user_id}"
                )
                return {
                    "WS_EVENT": "ERC20_LISTENER.HANDLE_ERC20_TRANSFER_EVENT",
                    "user_id": str(user_wallet.user_id),
                    "credit_amount": credit_amount,
                    "new_balance": float(credit_balance.balance),
                }
            else:
                print(f"Credit balance not found for user {user_wallet.user_id}")
        else:
            print(f"User wallet not found for address {to_address}")
    finally:
        db.close()
    return None


async def setup_erc20_transfer_listener():
    event_filter = usdt_contract.events.Transfer.create_filter(fromBlock="latest")
    while True:
        for event in event_filter.get_new_entries():
            yield event
        await asyncio.sleep(10)
