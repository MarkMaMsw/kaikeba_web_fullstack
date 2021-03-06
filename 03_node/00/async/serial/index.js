const logTime = (name) => {
    console.log(`Log...${name} ${new Date().toLocaleDateString()}`)
}

exports.callback = () => {
    setTimeout(() => {
        logTime("callback 1")
        setTimeout(() => {
            logTime("callback 2")
        }, 100)
    }, 100)
}

const promise = (name, delay = 100) => {
    return new Promise(resolve => {
        setTimeout(() => {
            logTime(name)
            resolve()
        }, delay)
    })
}

exports.promise = () => {
    promise('Promise 1')
        .then(promise('Promise 2'))
        .then(promise('Promise 3'))
}