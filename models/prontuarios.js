//chamando a conexão
const conexao = require('../infraestrutura/conexao')

//criando a classe do objeto Atendimento
class Atendimento {
    adiciona(atendimento,res) {
        //criando um tamanho dde caracteres mínimos para o nome do paciente
        const pacienteEhValido = typeof atendimento[0].nomePaciente === "string" && atendimento[0].nomePaciente.length >= 5

        //validando o nome do paciente para saber se está correto
        const validacoes = [
            {
                nome: 'nomePaciente',
                valido: pacienteEhValido,
                mensagem: 'Paciente deve ter pelo menos cinco caracteres'
            }
        ]

        //declarando variáveis que irão medir erro e se ele existir
        const erros = validacoes.filter(campo => !campo.valido)
        const existemErros = erros.length

        //criando condição de validação para o erro, se ele existir, o processo é interrompido gerando erro, se não, ele continua e os dados são salvos no banco de dados
        if(existemErros) {
            res.status(400).json(erros)
        } else {        
            //Criando uma tabela atendimento e dizendo suas propriedades
            const sql = 'INSERT INTO Atendimentos (nomePaciente, dataAtendimento, idade, dataNascimento, cpf, endereco, cep, email, servico, status, observacoes) SET ?'

            //passando cada elemento do vetor atendimento para x, transformando o objeto em um array values
            let  atd = atendimento.map(x => Object.values(x))
            console.log(atd)

            //verificando se a conversão está dando erro 
            conexao.query(sql, [atd], (erro, resultados) => {
                if(erro) {
                    res.status(400).json(erro)
                } else {
                    res.status(201).json(resultados)
                }
            })
        }
    }

    //gerando lista de atendimentos
    lista(res) {
        const sql = 'SELECT * FROM Atendimentos'

        conexao.query(sql, (erro, resultados) => { 
            if(erro) {
                res.status(400).json(erro)
            } else { 
                res.status(200).json(resultados)
            }
        })
    }

    //aplicando a busca po ID
    buscaPorId(id, res) {
        const sql = `SELECT * FROM Atendimentos WHERE id=${id}`;
    
        conexao.query(sql, (erro, resultados) => { 
            const atendimento = resultados[0];
            if(erro) { 
                res.status(400).json(erro);
            } else {
                res.status(200).json(atendimento);
            }
        })
    }

    // aplicando UPDATE na API
    altera(id, valores, res) {
        const sql = 'UPDATE Atendimentos SET nomePaciente = ?, dataAtendimento = ?, idade = ?, dataNascimento = ?, cpf = ?, endereco = ?, cep = ?, email = ?, servico = ?, status = ?, observacoes = ? WHERE id=?, res'
        
        conexao.query(sql, [valores, id], (erro, resultados) => { 
            if(erro) {
                res.status(400).json(erro)
            } else {
                res.status(200).json(resultados)
            }
        })
    }

    //inserindo função delete na api
    deleta(id, res) {
        const sql = 'DELETE FROM Atendimentos WHERE id=?'

        conexao.query(sql, id, (erro, resultados) => {
            if(erro) {
                res.status(400).json(erro)
            } else {
                res.status(200).json({id})
            }
        })
    }
}


module.exports = new Atendimento