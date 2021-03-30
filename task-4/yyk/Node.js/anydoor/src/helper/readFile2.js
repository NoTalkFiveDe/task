const fs = require('fs');

 
module.exports = function(req, res, filePath){
    fs.stat(filePath,(err,stats)=>{
        if(err){
            console.log(err)
            res.statusCode = 404;
            res.setHeader('Content-Type','text/javascript;charset=UTF-8');//utf8编码，防止中文乱码
            res.end(`${filePath} is not a directory or file.`)
            return;
        }
    })
}