const net = require('net');

var hostname = process.argv[2];
var port = process.argv[3];

const client = net.createConnection({host: hostname,port: port}, () => {
    console.log('connected to server!');
    
    process.stdin.setEncoding('utf8');

    process.stdin.on('readable',() => {
      var chunk = process.stdin.read();
      if( chunk !== null){
        // console.log("local: "+chunk);
        client.write("data: "+chunk);
      }

      // 在“旧”流模式下，默认情况下标准输入流已暂停
      process.stdin.resume();
    });

    // 重复一遍也可实现，但不知原因
    // process.stdin.on('readable',() => {
    //   var chunk = process.stdin.read();
    //   if( chunk !== null){
    //     console.log("local: "+chunk);
    //     client.write("data: "+chunk);
    //   }
    // });

});

client.on('data', (data) => {
    console.log(data.toString());
  // client.end();
});

client.on('end', () => {
    console.log('disconnected from server');
});