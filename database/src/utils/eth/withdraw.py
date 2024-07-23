from eth_account import Account
from web3 import Web3
import os
from .account import generate_user_wallet

SERVER_PRIVATE_KEY = os.getenv("SERVER_ETH_PRIVATE_KEY")
INFURA_PROJECT_ID = os.getenv("INFURA_PROJECT_ID")


def withdraw_funds(user_id: str, amount: int, to_address: str):
    server_account = Account.from_key(SERVER_PRIVATE_KEY)
    user_address = generate_user_wallet(user_id)

    # Connect to an Ethereum node (replace with your provider URL)
    w3 = Web3(Web3.HTTPProvider(f"https://mainnet.infura.io/v3/{INFURA_PROJECT_ID}"))

    # Create the transaction
    transaction = {
        "to": to_address,
        "value": amount,
        "gas": 21000,
        "gasPrice": w3.eth.gas_price,
        "nonce": w3.eth.get_transaction_count(user_address),
    }

    # Sign the transaction with the server's private key
    signed_txn = server_account.sign_transaction(transaction)

    # Send the transaction
    tx_hash = w3.eth.send_raw_transaction(signed_txn.rawTransaction)

    return tx_hash
