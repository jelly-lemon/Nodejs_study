/*
Node.Js TLS(SSL) HTTPS双向验证
https://blog.csdn.net/marujunyy/article/details/8477854

*/
var https = require('https');  
var fs = require('fs');  

// agent: false  这个属性一定要加上，不然证书不起作用
var options = {  
	host: '127.0.0.1',  
	port: 5558,  
	path: '/',  
	method: 'GET',  
	// These are necessary only if using the client certificate authentication  
	key: fs.readFileSync('client-key.pem'),  
	cert: fs.readFileSync('client-cert.pem'),  

	rejectUnauthorized: true,  
	// This is necessary only if the server uses the self-signed certificate  
	ca: [ fs.readFileSync('ca-cert.pem') ],  
	agent: false  	
	};  
var req = https.request(options, function(res) {  
	console.log('server authorize status: '+res.connection.authorized);  
	res.on('data', function(d) {  
	console.log('client authorize status: '+ d);  
	});  
});  
req.end();  
req.on('error', function(e) {  
	console.error(e);  
	});