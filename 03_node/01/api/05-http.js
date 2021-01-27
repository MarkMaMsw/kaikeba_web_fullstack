const http = require('http');
const fs = require('fs');

http.createServer((req, res) => {
    // console.log('there is a request');
    // console.log('req:', getPrototypeChain(req));
    // console.log('res:', getPrototypeChain(res));
    // res.end('hello node!');

    const { url, method } = req;
    if (url === '/' && method === 'GET') {
        fs.readFile('index.html', (err, data) => {
            if(err){
                res.writeHead(500, {'Content-Type':'text/plain;charset=utf-8'});
                res.end('500 server error');
                return;
            }
            res.statusCode=200;
            res.setHeader('Content-Type','text/html');
            res.end(data);
        });
    }
}).listen(3000, () => {
    console.log('server listen on port 3000')
})

// 打印原型链
function getPrototypeChain(obj) {
    const protoChain = [];
    while (obj = Object.getPrototypeOf(obj)) {
        protoChain.push(obj);
    }
    return protoChain;
}