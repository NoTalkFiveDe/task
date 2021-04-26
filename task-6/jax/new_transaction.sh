port=5000
if [ $# -eq 1 ];
then
	port=$1
fi
curl -X POST -H "Content-Type: application/json" -d '{
    "sender": "a4a43b8ea0f944d391bef97cd405250c",
    "recipient": "fdaf1a39f6a242f1a30942e6fdd96d42",
    "amount": 5
}' "http://localhost:$port/transactions/new"
