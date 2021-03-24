var net = require('net');
var clientList = [];

var server = net.createServer(function(socket){
	clientList.push(socket);

	socket.write('Echo server\r\n');
	// socket.pipe(socket);
	
	socket.on('data',function(data){
		console.log(data.toString());
		broadcast(data);
		// socket.write(data);
	});

	socket.on('end',function(){
		socket.write('end');
	});
});

function broadcast(data){
	for(var i = 0;i < clientList.length;i++){
		clientList[i].write(data);
	}
}

server.listen(2222,'127.0.0.1');