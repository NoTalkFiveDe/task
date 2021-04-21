curl -X POST -H "Content-Type: application/json" -d '{
    "nodes": ["http://127.0.0.1:'$1'"]
}' "http://localhost:$2/nodes/register"