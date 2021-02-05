const path = require('path')
const fs = require('fs')
module.exports = class TestNow {
    /**
     * 得到此文件目录下的所有文件的列表
     * @param {string} sourcePath 
     */
    genJestSource(sourcePath = path.resolve('./')) {
        const testPath = `${sourcePath}/__test__`
        if (!fs.existsSync(testPath)) {
            fs.mkdirSync(testPath)
        }

        // 读取并遍历代码文件
        let list = fs.readdirSync(sourcePath)
        list.map(v => `${sourcePath}/${v}`)         // 添加完整路径
            .filter(v => fs.statSync(v).isFile())   // 判断是文件还是文件夹
            .filter(v => v.indexOf('.spec') === -1) // 排除测试代码
            .map(v => this.genTestFile(v))          // 生成测试代码文件 
    }

    /**
     * 生成与源文件对应的测试文件代码
     * @param {string} filename 
     */
    genTestFile(filename) {
        console.log('filename:', filename)
        const testFileName = this.getTestFileName(filename)
        // 判断测试文件是否已存在
        if (fs.existsSync(testFileName)) {
            console.log('Test File Already exists')
            return
        }
        const mod = require(filename)
        let source
        if (typeof mod === 'object') {
            source = Object
                .keys(mod)
                .map(v => this.getTestSource(v, path.basename(filename), true))
                .join('\n')
        } else if (typeof mod === 'function') {
            const basename = path.basename(filename)
            source = this.getTestSource(basename.replace('.js', ''), basename)
        }
        fs.writeFileSync(testFileName, source)
    }
    
    /**
     * 生成测试文件的内容
     * @param {string} methodName 
     * @param {string} calssFile 
     * @param {bool} isClass 
     */
    getTestSource(methodName, calssFile, isClass = false) {
        console.log('getTestSource:', methodName)
        // return 模板字符串需要贴边写
        return `
test('${'TEST ' + methodName}', () => {
    const ${isClass ? '{' + methodName + '}' : methodName} = require('${'../' + calssFile}')
    const ret = ${methodName}()
    // expect(ret)
    //   .toBe('test return')
})
        `
    }

    /**
     * 生成测试文件名
     * @param {string} filename 代码文件名
     */
    getTestFileName(filename) {
        const dirName = path.dirname(filename)
        const baseName = path.basename(filename)
        const extName = path.extname(filename)
        const testName = baseName.replace(extName, `.spec${extName}`)
        return path.format({
            root: dirName + '/__test__/',
            base: testName
        })
    }
}