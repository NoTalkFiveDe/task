var http = require('http');
var url = require('url');
var qs = require('querystring');
var get = require('./httpGet');
var post  = require('./httpPost');

http.createServer(function (req,res){
	if(req.method == "GET"){
		get.doGet2(req, res);
	}else if( req.method == "POST"){
		post.doPost(req, res);
	}else{
		res.end();	
	}
}).listen(1337,'127.0.0.1');




console.log("running");

