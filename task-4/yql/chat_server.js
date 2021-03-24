var net = require('net');
var clientList=[];

var server = net.createServer(function(socket){
    clientList.push(socket);

    socket.write("Hello");
    
    socket.on('data',function(data){
        broadcast(data);
    })

    socket.on('end',function(){
        socket.write("end!");
    })
});

function broadcast(data){
    for(var i=0; i<clientList.length;i++){
        clientList[i].write(data);
    }
}

// server.listen(1339,"127.0.0.1");

exports.listen = function(T){
    server.listen(T);
}