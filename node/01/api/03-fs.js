const fs=require('fs');

// 同步读取 sync 文件读取过程是阻塞的
const data = fs.readFileSync('./conf.js');
console.log('data', data.toString());