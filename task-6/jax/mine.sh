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
}' "http://localhost:5000/mine"