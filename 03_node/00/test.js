// 个人学习测试
const fs = require('fs')
const path = require('path')
console.log(__dirname)
const fileName = '/abc/hello.html'

console.log('dirname', path.dirname(fileName))
console.log('basename', path.basename(fileName))
console.log('extname', path.extname(fileName))

let str = '123ab123ab'
console.log(str.replace(/ab/g, 'AB'))