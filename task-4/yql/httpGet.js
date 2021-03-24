function doGet(req,res){

	// var obj = qs.parse(url.parse(req.url).query);
	// console.log(obj);

	// 解析 get 请求 
	// console.log(qs.parse(url.parse(req.url).query));

	res.writeHead(200,{'Content-Type': 'text/html'});
	res.write('<html>');
	res.write('<head>');
	res.write('<title>');
	res.write('</title>');
	res.write('</head>');
	res.write('<body>');
	// res.write('<form method = "post">');	
	res.write('<form method = "post">');
	res.write('username: <input name="username">');
	res.write('password: <input name="password" type="password"><input type="submit">')
	res.write('</form>');
	res.write('</body>');
	res.write('</html>');
	res.end();
}


// 调用文件中的使用名 ｜  被调用文件 的函数名 
exports.doGet2 = doGet;