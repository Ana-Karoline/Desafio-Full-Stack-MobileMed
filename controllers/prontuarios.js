//esse arquivo realiza o controle de rotas do servidor - this file performs server route control

//exportando uma função que cria uma rota no servidor- export a function that criate a route off server
const Atendimento = require('../models/prontuarios')
module.exports = app => { 
    //get: solicita dados a partir de um recurso especificado, sendo visíveis para o usuário
    app.get('/prontuarios', (req, res) => { 
        Atendimento.lista(res)
    })

    app.get('/prontuarios/:id', (req, res) => { 
        const id = parseInt(req.params.id);
        Atendimento.buscaPorId(id, res);
    })

    //post: envia dados a serem processados para um recurso especificado, não é visível ao usuário
    app.post('/prontuarios', (req, res) => {
        const atendimento = req.body.data
        console.log(req.body.data)

        Atendimento.adiciona(atendimento, res)
    })

    //utilizando patch para aplicar UPDATE
    app.patch('/prontuarios/:id', (req, res,next) => {
        const id = parseInt(req.params.id)
        const valores = req.body

        Atendimento.altera(id, valores, res)
    })

    //utilizando delete para aplicar essa função na api
    app.delete('/atendimentos/:id', (req, res) => {
        const id = parseInt(req.params.id)

        Atendimento.deleta(id, res)
    })


}