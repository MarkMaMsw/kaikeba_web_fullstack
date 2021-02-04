const fs = require('fs')
test('集成测试 测试生成测试代码文件', () => {
    // 环境准备
    // 删除测试文件夹, __dirname是本文件所在的目录， recursive表示如果目录下有文件，把里面的所有文件删除
    fs.rmdirSync(__dirname + '/data/__test__', {
        recursive: true
    })
})

test('测试文件名生成', () => {
    const src = new (require('../index'))()
    const ret = src.getTestFileName('/abc/class.js')
    console.log('getTestFileName:', ret)
    expect(ret)
        .toBe('/abc/__test__/class.spec.js')
})