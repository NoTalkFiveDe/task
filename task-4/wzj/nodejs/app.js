var http = require('http');
var qs = require('querystring');
var url = require('url');
var httpPost = require('httpPost');

http.createServer(function(req,res){
	if(res.method == 'GET'){
		doGet(req,res);
	}
	else if(res.method == 'POST'){
		doPost(req,res);
	}else{
		res.end();
	}
}).listen(1111);