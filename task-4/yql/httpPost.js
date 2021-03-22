var qs = require("querystring")
function doPost(req,res){
	var formData = '';
	req.on('data',function(data){
		formData +=data;
	});
	req.on('end',function(){
		var obj2 = qs.parse(formData);
		console.log(obj2);
		res.end();
	});

}

exports.doPost = doPost;