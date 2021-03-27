var net = require('net');
// process.argv 属性会返回一个数组，其中包含当 Node.js 进程被启动时传入的命令行参数。
var hostname = process.argv[2];
var port = process.argv[3];
var id = process.argv[4];

var client = net.connect({host: hostname, port: port, id: id},
    function(){
        console.log('connected to server!');
        process.stdin.setEncoding('utf-8');

        process.stdin.on('readable', function(){
            var chunk = process.stdin.read();
            if (chunk !== null){
                client.write(`${id}: ` + chunk);
            }
        // 在“旧”的流模式中，默认情况下 stdin 流是暂停的，因此必须调用 process.stdin.resume() 从中读取。
        process.stdin.resume();
        });
    });

client.on('data', function(data){
    console.log(data.toString());
    //client.end();
});

client.on('end', function(){
    console.log('disconnected from server');
});