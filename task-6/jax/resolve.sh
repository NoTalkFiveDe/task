# inform localhost:port to resolve conflict
# Usage: resolve.sh [port]

port=5000
if [ $# -eq 1 ]
then port=$1
fi

curl -X GET "http://127.0.0.1:$port/nodes/resolve"
