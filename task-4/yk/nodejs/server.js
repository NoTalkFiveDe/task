var http = require('http');

http.createServer(function(req, res) {
    if (req.method == "GET") {
        writeWeb(req, res);
    } else if (req.method == "POST") {
        res.write('POST successed');
        console.log(req);
    } else {
        writeWeb(req, res);
    }
	res.end();
}).listen(1337, '127.0.0.1');

function writeWeb(req, res) {
	res.writeHead(200, {'Content-Type': 'text/html'});
    res.write('<html>');
    res.write('<head>');
    res.write('</head>');
    res.write('<body>');
	res.write('<form method="POST">');
    res.write('username:<input><input type="submit">');
    res.write('</form>');
    res.write('</body>');
    res.write('</html>');
}
console.log('running at http://127.0.0.1:1337/');
