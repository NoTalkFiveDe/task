const http = require('http');
const fs = require('fs');
const path = require('path');
const mime = require('mime');

const cache = {};
const port = 1024;  // 网页服务器所用端口

// 找不到页面时返回 404.md，但经过测试浏览器默认不支持 md 文件
const path404 = './public/404.md';
const mimeTypeMd = mime.getType(path.basename(path404));

fs.readFile(path404, (err, data) => {
    if (err) {
        cache[path404] = '404.md not found!';
    } else {
        cache[path404] = data;
    }
});

function send404(res) {
    res.writeHead(404, { 'Content-Type': mimeTypeMd });
    res.write(cache[path404]);
    res.end();
}

// @param: 回复，文件路径，文件内容
function sendFile(res, filePath, fileContent) {
    res.writeHead(200, { 'content-type': mime.getType(path.basename(filePath)) });
    res.end(fileContent);
}

function staticServer(res, absPath) {
    if (cache[absPath]) { sendFile(res, absPath, cache[absPath]); }
    else {
        fs.exists(absPath, (exists) => {
            if (exists) {
                fs.readFile(absPath, (err, data) => {
                    if (err) {
                        send404(res);
                    } else {
                        cache[absPath] = data;
                        sendFile(res, absPath, data);
                    }
                })
            } else {
                send404(res);
            }
        })
    }
}

const server = http.createServer((req, res) => {
    var filePath = null;

    console.log('requset url : ' + req.url);

    if (req.url == '/') filePath = 'public/index.html';
    else filePath = 'public' + req.url;

    const absPath = './' + filePath;
    staticServer(res, absPath);
});

server.listen(port, () => {
    console.log('Server is listening at port ' + port);
})