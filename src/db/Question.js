const Sequelize = require('sequelize');
const connection = require('./db');

const Question = connection.define('question',{ 
    titulo: {
        type: Sequelize.STRING,
        allowNUll: false
    },
    descricao:{
        type: Sequelize.TEXT,
        allowNUll: false
    }
});

/*

    Sincronização de modelo

    Quando você define um modelo, está dizendo ao Sequelize algumas coisas sobre sua tabela no banco de dados. No entanto, e se a tabela realmente nem existir no banco de dados? E se ele existir, 
    mas tiver colunas diferentes, menos colunas ou qualquer outra diferença?

    É aqui que entra a sincronização do modelo. Um modelo pode ser sincronizado com o banco de dados chamando model.sync(options), uma função assíncrona (que retorna uma promessa). Com esta chamada, 
    Sequelize executará automaticamente uma consulta SQL ao banco de dados. Observe que isso altera apenas a tabela no banco de dados, não o modelo no lado do JavaScript.

    User.sync() - Isso cria a tabela se ela não existir (e não faz nada se já existir)
    User.sync({ force: true }) - Isso cria a tabela, descartando-a primeiro se ela já existia
    User.sync({ alter: true }) - Isso verifica qual é o estado atual da tabela no banco de dados (quais colunas ela possui, quais são seus tipos de dados, etc) e, em seguida, realiza as alterações
    necessárias na tabela para torná-la compatível com o modelo.
    
    Exemplo:

    await User.sync({ force: true });
    console.log("The table for the User model was just (re)created!");

*/
Question.sync().then(()=>{
    console.log("Tabela pergunta criada");
});

module.exports = Question;