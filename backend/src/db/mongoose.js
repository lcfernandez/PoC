const mongoose = require('mongoose')

const mongoURL = 'dev.api.ies.labore.tech'
const mongoPort = '17013'

const username = encodeURIComponent('luizclaudio')
const password = encodeURIComponent('1luizclaudio1')
const databaseName = encodeURIComponent('luizclaudio')
const authDB = databaseName

const connectionURL = `mongodb://${username}:${password}@${mongoURL}:${mongoPort}/${databaseName}?authMechanism=SCRAM-SHA-1&authSource=${authDB}`

mongoose.connect(connectionURL).then(() => {
    console.log('Conexão com o banco realizada com sucesso!')
}).catch((e) => {
    console.log('Falha na conexão com o banco')
    console.log(e)
})


