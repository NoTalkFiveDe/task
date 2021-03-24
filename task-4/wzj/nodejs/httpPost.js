var qs = require('querystring');

function doPost(req,res){
	res.write('<html>');
	res.write('<head>');
	res.write('</head>');
	res.write('<body>');
	res.write('<form method="post">');
	res.write('<input>');
	res.write('<input type="password">');
	res.write('<input type="submit">');
	res.write('</form>');
	res.write('</body>');
}

exports.doPost();