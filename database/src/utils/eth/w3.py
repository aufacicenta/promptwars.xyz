import os
from web3 import Web3

INFURA_PROJECT_ID = os.getenv("INFURA_PROJECT_ID")

w3 = Web3(Web3.HTTPProvider(f"https://sepolia.infura.io/v3/{INFURA_PROJECT_ID}"))
