const http = require('http');
const fs = require('fs');
const path = require('path');
const mime = require('mime');

const cache = {};
const port = 8080;  // 网页服务器所用端口

// 找不到页面时返回 404.md，但经过测试浏览器默认不支持渲染 md 文件
const path404 = './public/404.md';

function sendFile(res, filePath) {
    res.writeHead(200, { 'Content-Type': mime.getType(path.basename(filePath)) });
    res.end(cache[filePath]);
}

function send404(res) {
    res.writeHead(404, { 'Content-Type': mime.getType(path.basename(path404)) });
    if (!cache[path404]) {
        fs.readFile(path404, (err, data) => {
            if (err) {
                console.log('Error when read 404 page');
                cache[path404] = 'Error when read 404 page';
            } else {
                cache[path404] = data;
            }
        });
    }
    sendFile(res, path404);
}

const server = http.createServer((req, res) => {
    console.log('requset url : ' + req.url);
    var filePath = req.url;
    if (filePath == '/') {
        filePath = 'public/index.html';
    } else {
        filePath = 'public' + filePath;
    }
    filePath = './' + filePath;

    if (cache[filePath]) {
        sendFile(res, filePath);
    } else {
        fs.readFile(filePath, (err, data) => {
            if (err) {
                console.log(filePath + ' not found');
                send404(res);
                // res.end();
            } else {
                cache[filePath] = data;
                sendFile(res, filePath);
            }
        });
    }
});

server.listen(port, () => {
    console.log('Server is listening at port ' + port);
})