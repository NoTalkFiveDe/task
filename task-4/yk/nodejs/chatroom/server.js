const net = require('net');

const clientMap = new Map();
var newClientId = 1;

// c 代表一个 socket 连接的客户端 client
const server = net.createServer((c) => {
    // 给每个客户端分配唯一的 id
    const id = newClientId++;
    console.log(`第 ${id} 个客户端已连接`);

    clientMap.set(id, c);
    console.log('已添加客户端 ' + id);

    c.write(`Server: 新人你好！你是 client ${id}\r\n`);

    clientMap.forEach((value, key, _map) => {
        if (key != id) {
            value.write(`Server: client ${id} 已连接\r\n`);
        }
    })

    c.on('data', (data) => {
        const msg = `client ${id} : ${data.toString()}`;
        // const msg = 'client ' + id + ' : ' + data.toString();
        console.log(msg);
        broadcast(msg);
    });

    c.on('end', () => {
        clientMap.delete(id);
        // console.log('客户端 ' + id + ' 已断开连接');
        const msg = `客户端 ${id} 已断开连接`;
        console.log(msg);
        broadcast(`Server: ${msg}`);
    });
});

function broadcast(msg) {
    clientMap.forEach((value, _key, _map) => {
        value.write(msg);
    })
}

server.on('error', (err) => {
    throw err;
});

server.listen(8124, () => {
    console.log('服务器已启动');
});