const fs = require('fs');
const { promisify } = require('util');
const readFile = promisify(fs.readFile);

// 同步读取 sync 文件读取过程是阻塞的
const data = fs.readFileSync('./conf.js');
console.log('sync data:', data.toString());

// 异步读取
fs.readFile('./conf.js', (err, data) => {
    if (err) throw err;
    console.log('async data:', data.toString());
});

// 使用promisify的方法，可用async awit语法
process.nextTick(async () => {
    const data = await readFile('./conf.js');
    console.log('promisify data:', data.toString());
});