/*

    NODE

    O Node.js é uma ferramenta que nos permite executar códigos escritos na linguagem JavaScript no servidor.

    O JavaScript é interpretado por uma engine que a princípio só era encontrado nos navegadores de páginas web.
    É através desse motor que o navegador web vai interpretar o código escrito na linguagem JavaScript.
    Por este motivo o JavaScript era uma linguagem web apenas.

    O Node.js utiliza o motor V8 do Google Chrome, ou seja a mesma ferramenta utilizada pelo navegador do
    Google para executar códigos JavaScript. Pelo fato do Node.js conseguir interpretar códigos JavaScript fora do navegador,
    o JavaScript deixou de ser apenas uma linguagem web e passou a ser também uma linguagem back-end (servidor) e mobile.

    Podemos dizer que o Node.js:

        Interpreta códigos JavaScript fora do navegador.
        Nos permite criar códigos Back-end utilizando JavaScript.
        Nos permite criar códigos para dispositivos móveis utilizando JavaScript.


*/

/*

    NPM

        npm init

        npm é o gerenciador de pacotes padrão para o ambiente de tempo de execução JavaScript Node.js.
        Ele consiste em um cliente de linha de comando, também chamado de npm, e um banco de dados
        online de pacotes públicos e privados pagos, chamado de registro npm. O registro é acessado
        por meio do cliente e os pacotes disponíveis podem ser navegados e pesquisados no site do npm.
        O gerenciador de pacotes e o registro são gerenciados pela npm, Inc.

        O NPM permite, para além da criação de módulos, executar instruções ou conjuntos de instruções através
        de um comando criado pelo utilizador conforme a sua necessidade.

*/

/*


    EXPRESS

        npm install express -- save

        Express.js (ou apenas Express) é um framework para Node.js que fornece recursos mínimos para construção de servidores web (HTTP).
        Foi lançado como software livre e de código aberto sob a Licença MIT. É um dos mais populares frameworks para servidores em Node.js.

*/

/*

    NODEMON


    npm install nodemon -s

    nodemon é uma ferramenta que ajuda a desenvolver aplicativos baseados em node.js reiniciando automaticamente o aplicativo de nó quando mudanças de arquivo no diretório são detectadas.

    O nodemon não requer nenhuma mudança adicional em seu código ou método de desenvolvimento. nodemon é um invólucro substituto para node. Para usar nodemon, substitua a palavra nodena linha
    de comando ao executar seu script.

    "
    
    Quando fui executar o projeto pelo comando "nodemon index.js", recebi um erro dizendo que o arquivo não podia ser carregado porque a execução de scripts foi desabilitada neste sistema.
    Pra resolver, abra seu PowerShell como administrador (clique no menu iniciar ou bandeira do Windows, digite "PowerShell", clique com o botão direito e "Executar como administrador")
    e digite sem aspas "Get-ExecutionPolicy", provavelmente o seu vai dar como "Restricted". Então, digite sem aspas "Set-ExecutionPolicy Unrestricted", vai aparecer uma mensagem de confirmação,
    digite sem aspas "S" e aperte enter. Resolvido :D

    "

*/

/*

    EJS - Embedded JavaScript templating. (Modelos de JavaScript incorporados)

    npm install ejs --save

    O EJS é uma engine de visualização, com ele conseguimos de uma maneira fácil e
    simples transportar dados do back-end para o front-end, basicamente conseguimos
    utilizar códigos em javascript no html de nossas páginas.

*/


/*

    BODY PARSER (analisador de corpo)

            Está presente no express

        Extrai a parte do corpo de um fluxo de solicitação de entrada e o expõe em req.body.


*/

/* 

    SEQUELIZE

        npm install sequelize --save
        
        Sequelize é um ORM(Object-Relational Mapper) para NodeJs baseado em promise,
        utilizado para os bancos de dados: Postgres, MySQL, MariaDB, SQLite e Microsoft
        SQL Server. 
        Como ORM, sequelize faz mapeamento de dados relacionais (tabelas, colunas e linhas)
        para objetos JavaScript.

        Permite criar, buscar, atualizar e remover dados do banco utilizando métodos JS,
        permite modificar a estrutura de tabelas, facilitando na criação, população e
        migração do banco de dados.

*/

/* 

    MYSQL2

        npm install mysql2 --save

        O projeto MySQL2 é uma continuação do MySQL-Native . O código do analisador de protocolo foi reescrito do zero e a API alterada para corresponder ao popular mysqljs / mysql .
        A equipe MySQL2 está trabalhando junto com a equipe mysqljs / mysql para fatorar o código compartilhado e movê-lo para a organização mysqljs .

        O MySQL2 é principalmente compatível com a API do mysqljs e suporta a maioria dos recursos. MySQL2 também oferece esses recursos adicionais

            Mais rápido / melhor desempenho
            Declarações Preparadas
            Protocolo de registro binário do MySQL
            Servidor MySQL
            Suporte estendido para codificação e agrupamento
            Promise Wrapper
            Compressão
            SSL e chave de autenticação
            Streams personalizados
            Pooling

*/

const express = require("express");
const app = express();

//Db
const connection = require('./db/db');

//Models
const Question = require('./db/Question')
const Answer = require('./db/Answer');

connection
    .authenticate()
    .then(()=>{
        console.log("Conexão feita com o banco de dados!")
    })
    .catch((msgErro)=>{
        console.log(msgErro);
    });

//Express, determine que o ejs é a view engine
app.set("view engine", 'ejs');

//Express, use a pasta public como a origem de arquivos estáticos 
app.use(express.static('public'));

//Express, use o urlencoded (body-parser) para receber dados dos formulários
app.use(express.urlencoded({extended: false}))

//Express, use o json (body-parser) como formato de recebimento dos dados dos formulários   
app.use(express.json());

//Rotas

app.get("/", (req, res) =>{
    
    //Raw: true => retorno simplificado

    Question.findAll({raw: true, order: [['id', 'DESC']]}).then((questions)=>{
        res.render("index", {
            questions: questions
        });
    });
    

});

app.get("/ask", (req, res) =>{
    res.render("ask");
});


app.get("/question/:id", (req, res) =>{
    Question.findOne({
        where: {id: req.params.id}
    }).then((question)=>{
        if(question != undefined){

            Answer.findAll({
                where: {perguntaId: question.id},
                order: [['id', 'DESC']]
            }).then(answers =>{
                res.render("question",{
                    question: question,
                    answers: answers
                });
            });
        }else{
            res.redirect("/");
        }
        
    });
})

app.post("/save_question", (req, res) => {
    Question.create({
        titulo:  req.body.titulo,
        descricao: req.body.descricao
    }).then(()=>{
        res.redirect('/');
    });

    
});


app.post("/save_answer",(req, res)=>{
    let perguntaId = req.body.perguntaId;
    Answer.create({
        corpo: req.body.corpo,
        perguntaId: perguntaId
    }).then(()=>{
        res.redirect("/question/"+perguntaId);
    });
});


app.listen(8080, ()=>{
    console.log("App rodando!")
});