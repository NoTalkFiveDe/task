var net = require('net');
// 用字典来存储连接
var clientList = {};
var id = 0;

var server = net.createServer(function (socket){
    var sid = id;
    id++;
    clientList[sid] = socket;
    socket.write(sid+'号客户端连接成功! \r\n');

    socket.on('data', function(data){
        console.log(data.toString()); 
        broadcast(data,sid);
    });
    socket.on('end', function(){
        delete clientList[sid];
        console.log(sid+'号客户端退出连接！')
    });
});

function broadcast(data){
    for(var key in clientList){
        clientList[key].write(data);
    }
}

server.listen(1337, '127.0.0.1');

exports.listen = function(T){
    server.listen(T)
}