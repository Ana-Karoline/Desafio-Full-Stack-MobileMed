//importando banco de dados mysql - import mysql database
const mysql = require('mysql')

//configurações do banco de dados - database settings
const conexao = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'c9d3bb8b5d',
    database: 'prontuarios'
})

//exportando a conexão - conexao export
module.exports = conexao