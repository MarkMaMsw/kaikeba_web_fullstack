test("hello world", () => {
    const ret = require('../index')
    expect(ret).toBe('Hello World')
})

