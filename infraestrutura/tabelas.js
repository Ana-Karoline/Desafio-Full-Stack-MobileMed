
class Tabelas {
    init(conexao) {
        this.conexao = conexao
        this.criarAtendimentos()
    }
    criarAtendimentos() {
        const sql = 'CREATE TABLE IF NOT EXISTS Atendimentos (id int NOT NULL AUTO_INCREMENT, nomePaciente varchar(50) NOT NULL, dataAtendimento datetime NOT NULL, idade int(3) NOT NULL, dataNascimento date NOT NULL, cpf bigint NOT NULL, endereco varchar(50) NOT NULL, cep varchar(20) NOT NULL, email varchar (50) NOT NULL, servico varchar(30) NOT NULL, status varchar(30) NOT NULL, observacoes text, PRIMARY KEY(id))'
        this.conexao.query(sql, erro => {
            if(erro) {
                console.log(erro)
            } else {
                console.log('Tabela Atendimentos criada com sucesso')
            }
        })
    }
}

module.exports = new Tabelas