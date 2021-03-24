var net = require('net');
var hostname = process.argv[2];
var port = process.argv[3];


var client = net.connect({hostname:hostname,port:port},function(){
	console.log('Connect to server');
	process.stdin.setEncoding('utf-8');

	process.stdin.on('readable',function(){
		var chunk = process.stdin.read();
		if(chunk !== null){
			client.write('data:' + chunk);
		}
	});
});

client.on('data',function(data){
	console.log(data.toString());
	// client.end();
});

client.on('end',function(){
	console.log('disconnected from server');
});