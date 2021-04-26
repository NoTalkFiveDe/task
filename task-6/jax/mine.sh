# Description: try to mine a block on localhost:port
# Usage: mine.sh [port]

port=5000
if [ $# -eq 1 ]
then port=$1
fi

curl -X GET -H "Content-Type: application/json" -d '{
    "hash": "a4a43b8ea0f944d391bef97cd405250c12345",
    "index": 4,
    "message": "New Block Forged",
    "proof": 35089,
    "transactions": [
        {
            "amount": 1,
            "recipient": "a4a43b8ea0f944d391bef97cd405250c",
            "sender": "0"
        }
    ]
}' "http://localhost:$port/mine"
