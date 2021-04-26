# register a new server port on the specific server port
# Usage: register.sh [new server port] [specific server port]

new=5001
port=5000
if [ $# -ge 1 ]
then
	new=$1
	if [ $# -eq 2 ]
	then port=$2
	fi
fi

curl -X POST -H "Content-Type: application/json" -d '{
    "nodes": ["http://127.0.0.1:'$new'"]
}' "http://localhost:$port/nodes/register"
