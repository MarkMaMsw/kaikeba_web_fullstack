const fs = require('fs');
// stream 广泛用于I/O处理中，好处是非常的节省内存资源
const rs = fs.createReadStream('./01.jpg');
const ws = fs.createWriteStream('./02.jpg');
// 把两个流连接起来，即可完成文件的拷贝
rs.pipe(ws)