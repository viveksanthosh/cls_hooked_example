const express = require('express');
const server = express()
const { delay } = require('bluebird')

server.get('/delay', async (req, res) => {
    res.status(200).send()
    const { delayTime, id } = req.query;
    await doSomething(delayTime, id)
    console.log(process.pid);
})

server.listen(4000, () => {
    console.log(process.pid);
    console.log('started');
})

async function doSomething(delayTime, id) {
    await delay(delayTime)
    console.log('done ', id);
}