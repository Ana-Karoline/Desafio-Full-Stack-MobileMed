//esse arquivo configura tudo relacionado ao express - this file configures everything related to express

//chamando a biblioteca express e criando um aplicativo - calling the express library and building an app
const express = require ('express')
const consign = require ('consign')

//chamando a biblioteca bodyParser (lê informações inseridas para post) - calling bodyParser library (reads information entered for post)
const bodyParser = require ('body-parser')

//chamando a biblioteca consign, integrando a pasta controllers no app e retornando app - calling the consign library, integrating the controllers folder into the app and return app
module.exports = () => {
    const app = express()
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({extended: true}))
    consign()
        .include ('controllers')
        .into(app)
    return app
}