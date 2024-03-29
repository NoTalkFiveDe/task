import hashlib
import json
import sys
import os
from time import time
import requests
# from textwrap import dedent
from urllib.parse import urlparse
from uuid import uuid4

from flask import Flask, jsonify, request

# 为当前结点生成一个全局唯一的地址
node_identifier = str(uuid4()).replace('-', '')
port = 5000
db_folder = ''

class BlockChain(object):
    def __init__(self):
        self.chain = []
        self.current_transactions = []
        self.nodes = set()

        # 创建创始区块
        self.new_block(previous_hash=1, proof=100)

    def register_node(self, address):
        """
        Add a new node to the list of nodes
        :param address: <str> Address of nodes. Eg. 'http://192.168.0.5:5000'
        :return: None
        """

        parsed_url = urlparse(address)
        self.nodes.add(parsed_url.netloc)

    def new_block(self, proof, previous_hash=None):
        """
        :param proof: <int> The proof given by the Proof of Work algorithm
        :param previous_hash: (Optional) <str> Hash of previous Block
        :return: <dict> New Block
        """

        block = {
            'index': len(self.chain) + 1,
            'timestamp': time(),
            'transactions': self.current_transactions,
            'proof': proof,
            'previous_hash': previous_hash or self.hash(self.chain[-1]),
        }
        
        # save new block to json file
        if os.system(f'ls {db_folder}') != 0:
            os.system(f'mkdir {db_folder}')
        file = f'./{db_folder}/block-{block["index"]}.json'
        f = open(file, 'w');
        json.dump(block, f, sort_keys=True)
        f.close()

        # 重置当前的交易列表
        self.current_transactions = []

        self.chain.append(block)
        return block

    def new_transaction(self, sender, recipient, amount):
        """
        创建一个新的交易放入下一个区块
        :param sender: <str> Address of the Sender
        :param recipient: <str> Address of the Recipient
        :param amout: <int> Amount
        :return: <int> The index of the Bolck that will hold this transaction
        """

        self.current_transactions.append({
            'sender': sender,
            'recipient': recipient,
            'amount': amount,
        })

        return self.last_block['index'] + 1

    @staticmethod
    def hash(block):
        """
        :param block: <dict> Block
        :return: <str>
        """

        # 必须确保字典是排好序的，否则会导致不一致的散列值
        block_string = json.dumps(block, sort_keys=True).encode()
        return hashlib.sha256(block_string).hexdigest()

    @property
    def last_block(self):
        return self.chain[-1]

    # @staticmethod
    def proof_of_work(self, last_proof):
        """
        简单的工作量证明算法：
        - 找到一个数 p' 使得 hash(pp') 包含 4 个前导 0, p 是前一个 p'
        - p 是前一个区块的证明，p' 是新区块的证明
        """

        proof = 0
        while not self.valid_proof(last_proof, proof):
            proof += 1
        return proof

    @staticmethod
    def valid_proof(last_proof, proof):
        """
        :param last_proof: <int> Previous Proof
        :param proof: <int> Current Proof
        :return: <bool> True if correct, False if not.
        """

        guess = f'{last_proof}{proof}'.encode()
        guess_hash = hashlib.sha256(guess).hexdigest()
        return guess_hash[:4] == '0000'

    def valid_chain(self, chain):
        """
        判断给定的区块链是否有效
        :param chain: <list> A blockchain
        :return: True if valid, False if not.
        """

        last_block = chain[0]
        current_index = 1

        while current_index < len(chain):
            block = chain[current_index]
            print(f'{last_block}')
            print(f'{block}')
            print('\n---------------------\n')

            # 检查散列值
            if block['previous_hash'] != self.hash(last_block):
                return False

            # 检查计算量证明
            if not self.valid_proof(last_block['proof'], block['proof']):
                return False

            last_block = block
            current_index += 1

        return True

    def resolve_conflicts(self):
        """
        这是我们用来实现共识的算法，解决冲突的方法是用网络中最长的区块链替换当前链
        :return: <bool> True if our chain was replaced, False if not.
        """

        neighbours = self.nodes
        new_chain = None

        # 只需要找比我们长的区块链
        max_length = len(self.chain)

        for node in neighbours:
            response = requests.get(f'http://{node}/chain')
            if response.status_code == 200:
                response_json = response.json()
                length = response_json['length']
                chain = response_json['chain']

                if length > max_length and self.valid_chain(chain):
                    # 时刻更新最大长度，避免不必要的判断
                    max_length = length
                    new_chain = chain

        # print('new_chain', new_chain)
        if new_chain:
            self.chain = new_chain
            for i in range(len(self.chain)):
                f = open(f'{db_folder}/block-{i + 1}.json', 'w')
                json.dump(self.chain[i], f, sort_keys=True)
                f.close()

            return True

        return False


if __name__ == '__main__':
    if len(sys.argv) == 2:
        port = int(sys.argv[1])
    db_folder = f'db-{port}'


    # 实例化区块链
    blockchain = BlockChain()

    # 实例化结点
    app = Flask(__name__)

    @app.route('/chain', methods=['GET'])
    def full_chain():
        response = {
            'chain': blockchain.chain,
            'length': len(blockchain.chain),
        }
        return jsonify(response), 200


    @app.route('/transactions/new', methods=['POST'])
    def new_transaction():
        values = request.get_json()

        # 检查要求的域是否都有
        required = ['sender', 'recipient', 'amount']
        if not all(k in values for k in required):
            return 'Missing values', 400

        # 创建一个新交易
        index = blockchain.new_transaction(
            values['sender'], values['recipient'], values['amount'])

        response = {'message': f'Transaction will be added to Block {index}'}
        return jsonify(response), 201


    @app.route('/mine', methods=['GET'])
    def mine():
        # 我们需要运行工作量证明算法来得到下一个工作量证明
        last_block = blockchain.last_block
        last_proof = last_block['proof']
        proof = blockchain.proof_of_work(last_proof)

        # 我们必须为找到工作量证明获得奖励
        # sender 为 '0' 表示该结点已经挖到了一个新的币
        blockchain.new_transaction(
            sender='0',
            recipient=node_identifier,
            amount=1,
        )

        block = blockchain.new_block(proof)

        response = {
            'message': 'New Block Forged',
            'index': block['index'],
            'transactions': block['transactions'],
            'proof': block['proof'],
            'previous_hash': block['previous_hash'],
        }
        return jsonify(response), 200


    @app.route('/nodes/register', methods=['POST'])
    def register_nodes():
        values = request.get_json()

        nodes = values.get('nodes')
        if nodes is None:
            return "Error: Please supply a valid list of nodes", 400

        for node in nodes:
            blockchain.register_node(node)

        response = {
            'message': 'New nodes have been added',
            'total_nodes': list(blockchain.nodes),
        }
        return jsonify(response), 201


    @app.route('/nodes/resolve', methods=['GET'])
    def consensus():
        replaced = blockchain.resolve_conflicts()

        if replaced:
            response = {
                'message': 'Our chain was replaced',
                'new_chain': blockchain.chain
            }
        else:
            response = {
                'message': 'Our chain is authoritative',
                'chain': blockchain.chain
            }

        return jsonify(response), 200


    app.run(host='0.0.0.0', port=port)
