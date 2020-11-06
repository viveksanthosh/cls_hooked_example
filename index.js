const express = require('express');
const server = express()
const { delay } = require('bluebird')

const timerMiddleware = (req, res, next) => {
    const time = (new Date()).getTime()
    let id = req.query.id
    let enterTime = time

    res.locals.id = id
    res.locals.enterTime = enterTime

    res.on("finish", () => {
        const time = (new Date()).getTime()
        const { enterTime, id } = res.locals
        console.log(`time for ${id}->`, time - enterTime);
    })
    next()
}

server.get('/execute', timerMiddleware, async (req, res) => {
    const { delayTime, id } = req.query;
    console.log('hit id -> ', res.locals.id );
    await doSomething(delayTime, id)
    res.status(200).send()
})

server.listen(4000, () => {
    console.log(process.pid);
    console.log('started');
})

async function doSomething(delayTime, id) {
    await delay(delayTime)
    console.log('done ', id);
}