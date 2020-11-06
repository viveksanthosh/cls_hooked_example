const cls = require('cls-hooked');
const { delay } = require('bluebird');

const nsid = 'a6a29a6f-6747-4b5f-b99f-07ee96e32f88';
const session = cls.createNamespace(nsid); //namespace

for (let i = 0; i < 3; i++) {
    const delayTime = Math.floor(Math.random() * 1000)
    session.run(async () => {
        session.set('delay', delayTime)
        session.set('i', i)
        console.log(delayTime, '--', i)
        processInformation()

    })
}

function processInformation() {
    let delayTime = session.get('delay')
    return delay(delayTime).then(() => {
        console.log('here')
        console.log(session.get('delay'), '--++--', session.get('i'))
    })
}