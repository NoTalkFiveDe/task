const http = require('http');
const chalk = require('chalk');
const path = require('path');	// path模块，用于处理文件与目录的路径
const config = require('./config/defaultConfig.js');
const readFile = require('./helper/readFile.js');



 
var server = http.createServer(function(req,res){
	// path.join()方法把给定的path片段连接在一起，并规范化生成的路径。
	const filePath = path.join(config.root,req.url)
	console.info("path",`${chalk.green(filePath)}`)
	readFile(req,res,filePath)
});
 
server.listen(config.port,config.hostname,()=>{
	var addr = `http://${config.hostname}:${config.port}`;
	console.info(`listenning in:${chalk.green(addr)}`);	
})

var chatServer = require('./socket/server');
chatServer.listen(1337,'127.0.0.1');