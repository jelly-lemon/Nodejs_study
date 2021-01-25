/*
Node.Js TLS(SSL) HTTPS双向验证
https://blog.csdn.net/marujunyy/article/details/8477854

需要指定 express 版本
npm install express@2.5.10
*/

var express = require('express')  
var fs=require('fs');  

// 服务端也要求客户端的证书 requestCert: true
var options = {  
	key: fs.readFileSync('server-key.pem'),  
	cert: fs.readFileSync('server-cert.pem'),  
	ca: [ fs.readFileSync('ca-cert.pem') ],  
	requestCert:        true,  
	rejectUnauthorized: false  
	};  
	
var app = module.exports = express.createServer(options);  

// Configuration  
app.configure(function(){  
	app.use(app.router);  
	});  

app.configure('development', function(){  
	app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));  
});  

app.configure('production', function(){  
	app.use(express.errorHandler());  
	});  

// Routes  
app.all('/', function(req, res){  
	if (req.client.authorized) {  
	res.writeHead(200, {"Content-Type":"application/json"});  
res.end('{"status":"authorized"}');  
//        console.log(req.client);  
console.log("Authorized Client ", req.client.socket.remoteAddress);  
} else {  
	res.writeHead(401, {"Content-Type":"application/json"});  
res.end('{"status":"denied"}');  
console.log("Denied Client " , req.client.socket.remoteAddress);  
}  
});  

app.listen(5558); // 端口设置
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);  
  