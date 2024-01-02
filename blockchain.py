import hashlib
import json
from time import time

class Block:
    def __init__(self, index, transactions, timestamp, previous_hash):
        self.index = index
        self.transactions = transactions
        self.timestamp = timestamp
        self.previous_hash = previous_hash
        self.hash = self.calculate_hash()

    def calculate_hash(self):
        block_string = json.dumps(self.__dict__, sort_keys=True).encode()
        return hashlib.sha256(block_string).hexdigest()

class Blockchain:
    def __init__(self):
        self.chain = []
        self.current_transactions = []
        self.new_block(previous_hash='1', proof=100)

    def new_block(self, proof, previous_hash=None):
        block = Block(len(self.chain) + 1, self.current_transactions, time(), previous_hash or self.chain[-1].hash)
        self.current_transactions = []
        self.chain.append(block)
        return block

    def new_transaction(self, sender, recipient, amount):
        self.current_transactions.append({
            'sender': sender,
            'recipient': recipient,
            'amount': amount,
        })
        # Create a new block for each new transaction
        new_block = self.new_block(proof=12345)  # Proof is a placeholder, replace with actual proof of work
        return new_block.index

    @property
    def last_block(self):
        return self.chain[-1]


#TODO
  #  https://docs.google.com/document/d/1JMmC7VAX5MaSVITf8TNbrtTdUBwMT1jL3fIukCtOPJk/edit?usp=sharing
# Example of adding a transaction and automatically creating a new block
# Initialize the blockchain
blockchain = Blockchain()

# Add transactions
blockchain.new_transaction("A", "B", 100)
blockchain.new_transaction("C", "D", 200)
blockchain.new_transaction("E", "F", 300)

# Function to print the details of each block
def print_blockchain(chain):
    for block in chain:
        print(f"Block Index: {block.index}")
        print(f"Transactions: {block.transactions}")
        print(f"Timestamp: {block.timestamp}")
        print(f"Current Hash: {block.hash}")
        print(f"Previous Hash: {block.previous_hash}")
        print("-" * 50)

# Print the blockchain
print_blockchain(blockchain.chain)
