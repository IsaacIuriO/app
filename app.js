// app.js
const express = require('express');
const mysql = require('mysql2/promise');

const conn = mysql.createConnection({
    database: 'db_eletro',
    user: 'root',
    password: '',
    host: 'localhost'
});

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.set('views', 'views')

const port = 3333;
app.listen(port);

//----------------------------------
// CATEGORIA
//----------------------------------

// CRIAR
app.post('/categoria/criar', async (req, res) => {

    const { nome, descricao } = req.body;
    const cmd = `INSERT INTO categoria (nome, descricao) VALUES (?, ?);`;
    const sql = await conn.query(cmd, [nome, descricao]);

    if(sql[0].affectedRows == 0)
    {

    }

    res.redirect('/categoria/lista');
});

app.get('/', (req, res) => {
    res.redirect('/categoria/criar');
})

app.get('/categoria/criar', (req, res) => {
    res.render('criar.ejs');
});



// LISTAR
app.get('/categoria/lista', async(req, res) => {

    let dados = [];
    const cmd = `SELECT * FROM categoria;`;
    const sql = await conn.query(cmd);

    if(sql[0].length > 0)
    {
        dados = sql[0]
    }

    res.render('lista.ejs', { dados: dados });

});



// EDITAR
app.get('/categoria/editar/:id', async (req, res) => {

    const { id } = req.body;
    const cmd = `SELECT * FROM categoria WHERE id_categoria = ?;`;
    const sql = conn.query(cmd, [id]);
    const dado = sql[0];

    res.render('editar.ejs', {dado: dado[0]});
});

app.post('/categoria/editar', async (req, res) => {

    const { id, nome, descricao } = req.body;
    const cmd = `UPDATE categoria SET nome = ?, descricao = ? WHERE id_categoria = ?;`;
    const sql = conn.query(cmd, [nome, descricao, id]);

    if(sql[0].affectedRows == 0)
    {

    }

    res.redirect('/categoria/lista');
});



// APAGAR
app.get('/categoria/apagar/:id', async (req, res) => {

    const { id } = req.body;
    const cmd = `DELETE FROM categoria WHERE id_categoria = ?;`;
    const sql = conn.query(cmd, [id]);
    if(sql[0].affectedRows == 0)
    {

    }

    res.redirect('/categoria/lista');
});


//----------------------------------
// COMPONENTE
//----------------------------------


// CRIAR
app.post('/componente/criar', async (req, res) => {

    const { nome, descricao, preco, quantidade_estoque } = req.body;

    const cmd = `INSERT INTO componente (nome, descricao, preco, quantidade_estoque) VALUES (?, ?, ?, ?);`;
    const sql = conn.query(cmd, [nome, descricao, preco, quantidade_estoque]);

    if(sql[0].affectedRows == 0)
    {

    }

    res.redirect('/categoria/lista');
});
