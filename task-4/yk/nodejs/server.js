const net = require('net');

const clientList = [];

const server = net.createServer((c) => {
    // 'connection' 监听器。
    console.log('客户端已连接');
    clientList.push(c); // 记录客户端
    console.log('已添加客户端: ' + c.address() + '\r\n');

    c.write('你好\r\n');
    // c.pipe(c);
    c.on('data', (data) => {
        console.log('client: ' + data.toString());
        // c.write('message from client: ' + data.toString());
        broadcast(data);
        // c.write('recieved\r\n');
    });

    c.on('end', () => {
        console.log('客户端已断开连接');
    });
});

function broadcast(data) {
    for (var i = 0; i < clientList.length; ++i) {
        clientList[i].write(data);
    }
}

// 异常处理
server.on('error', (err) => {
    throw err;
});

// 监听即启动服务
server.listen(8124, () => {
    console.log('服务器已启动');
});