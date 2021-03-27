const http = require('http');
const path = require('path');	// path模块，用于处理文件与目录的路径
const mime = require('mime');
const fs = require('fs');
var cache = {};

function send404(res) {
	res.writeHead(404, { 'Content-Type': 'text/plain' });
	res.write('Error 404: resource not found.');
	res.end();
}

function sendFile(res, filePath, fileContents) {
	res.writeHead(
		200,
		{ "content-type": mime.getType(filePath) }
	);
	res.end(fileContents);
}

function sendDir(req, res, files) {
	res.statusCode = 200;
	res.setHeader('Content-Type', 'text/html;charset=UTF-8');
	res.write('<html><body><div>')
	var html = '';
	for (let i = 0; i < files.length; i++) {//
		html += '<a style="display:block" href="http://127.0.0.1:3000' +
			req.url + '/' + files[i] + '">' + files[i] + '</a>';
	}
	res.write(html);//返回所有的文件名
	res.end('</div></body></html>')
}

function serverStatic(req, res, cache, absPath) {
	if (cache[absPath]) {
		sendFile(res, absPath, cache[absPath]);
	} else {
		// 检测路径是否存在
		if (fs.existsSync(absPath)) {
			// 检测是否是文件
			if (fs.statSync(absPath).isFile()) {
				fs.readFile(absPath, function (err, data) {
					if (err) {
						send404(res);
					} else {
						cache[absPath] = data;
						sendFile(res, absPath, data);
					}
				});
			}
			// 如果是文件夹
			if (fs.statSync(absPath).isDirectory()) {
				fs.readdir(absPath, function (err, files) {
					if (err) {
						send404(res);
					} else {
						sendDir(req, res, files);
					}
				})
			}
		} else {
			send404(res);
		}

	}
}

var server = http.createServer(function (req, res) {
	var filePath = false;

	if (req.url == '/') {
		filePath = 'public/index.html';
	} else {
		filePath = req.url;
	}

	var absPath = './' + filePath;
	serverStatic(req, res, cache, absPath);
})

server.listen(3000, function () {
	console.log("Server listening on port 3000.");
});

var chatServer = require('./socket/server');
chatServer.listen(1337, '127.0.0.1');