/*
openssl生成证书+安装+使用实例
https://blog.csdn.net/g1531997389/article/details/80048313

实现了单向认证，服务端带证书
*/


// 加载 https 模块
const https = require('https')

// 加载 fs 模块
const fs = require('fs')

// 读取服务器密钥与证书
const options = {
	key: fs.readFileSync('server-key.pem'),
	cert: fs.readFileSync('server-cert.pem')
}

// 创建服务器
https.createServer(options, (req, res) => {
	res.writeHead(200, {'Content-Type': 'text/plain;charset=utf8'})
	res.write('hello world!')
	res.end()
}).listen(8080, () => {
	console.log('Server is running...')
})