const net = require('net');

// const port = process.argv[2];
const port = 8124;

const client = net.createConnection({ port: port }, () => {
    // 'connect' 监听器
    console.log('已连接到服务器');
    client.write('I am client!\r\n');  // 向服务器传递信息

    // 传递标准输入到服务器
    process.stdin.setEncoding('utf-8');
    process.stdin.on('readable', () => {
        var chunk = process.stdin.read();
        if (chunk != null) {
            client.write(chunk);
        }

        process.stdin.resume(); // 必须恢复，否则标准输入流会暂停
    })
});

// 收到信息后就断开客户端
client.on('data', (data) => {
    console.log('server: ' + data.toString());
    // client.write('接收到服务器信息');
    // client.end();
});

// 响应服务器断开的事件
client.on('end', () => {
    console.log('已从服务器断开');
});