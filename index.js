const express = require('express');
const server = express()
const { delay } = require('bluebird')
const createNamespace = require('cls-hooked').createNamespace;
const session = createNamespace('test_session');

const middleware = (req, res, next) => {
    session.run(() => {
        set('id', req.query.id)
        set('delayTime', req.query.delayTime)
        next()
    });
    res.on('finish', () => {
        console.log(get('status'));
    })
}

server.get('/execute', middleware, async (req, res) => {
    res.status(200).send()
    await doSomething()
    console.log(process.pid);
})

server.listen(4000, () => {
    console.log(process.pid);
    console.log('started');
})

async function doSomething() {
    const id = session.get('id');
    const delayTime = session.get('delayTime');
    console.log(id)
    if (id === '1')
        set('status', true)
    else
        set('status', false)
    await delay(delayTime)
    console.log('done ', id);
}


function get(key) {
    if (session && session.active) {
        return session.get(key);
    } else {
        console.log('session get miss')
    }
}

function set(key, value) {
    if (session && session.active) {
        return session.set(key, value);
    } else {
        console.log('session set miss')
    }
}
