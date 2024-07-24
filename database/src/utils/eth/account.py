from eth_account import Account
from eth_account.signers.local import LocalAccount
import os
from eth_utils import to_checksum_address
from web3.middleware import construct_sign_and_send_raw_middleware
from .w3 import w3

SERVER_PRIVATE_KEY = os.getenv("SERVER_ETH_PRIVATE_KEY")


def generate_user_wallet(user_id: str) -> str:
    if not SERVER_PRIVATE_KEY:
        raise ValueError("SERVER_PRIVATE_KEY not set in environment variables")

    # Ensure the SERVER_PRIVATE_KEY is in the correct format
    # server_account = Account.from_key(SERVER_PRIVATE_KEY)
    server_account: LocalAccount = Account.from_key(SERVER_PRIVATE_KEY)
    w3.middleware_onion.add(construct_sign_and_send_raw_middleware(server_account))

    # Create a unique salt for each user
    # salt = f"user_{user_id}"

    # Combine the server's address and user salt
    # combined = server_account.address + salt

    # Hash the combined string to create a deterministic index
    # index = int(Web3.keccak(text=combined).hex(), 16)

    # Generate the user's address using the server's account and the index
    user_address = server_account.address

    # Return the checksum address
    return to_checksum_address(user_address)
