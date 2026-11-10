// app.js

const mysql = require('mysql2');

const conn = mysql.createConnection({
    database: 'db_eletro',
    host: 'localhost',
    user: 'root',
    password: ''
});

const express = require('express');
const app = express();

const port = 2000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('lista');
});

app.post('/categoria/criar', async (req, res) => {
    
    const { nome, descricao } = req.body;

    const cmd = `INSERT INTO categoria (nome, descricao) VALUES (?, ?);`;
    const sql = conn.query(cmd, [nome, descricao]);

    if(sql[0].affectedRows == 0)
    {

    }

    res.redirect('/categoria/lista');
});

app.post('/categoria/editar/:id', async (req, res) => {

    const { id, nome, descricao } = req.body;

    const cmd = `UPDATE categoria SET nome = ?, descricao = ? WHERE id = ?;`;
    const sql = conn.query(cmd, [nome, descricao, id]);

    if(sql[0].affectedRows == 0)
    {

    }

    res.redirect('/categoria/lista');
});

app.get('/categoria/criar', (req, res) => {
    res.render('criar.ejs');
});

app.get('/categoria/editar:id', async (req, res) => {
    
    const id = req.params.id;
    const cmd = `SELECT * FROM usuario WHERE id = ?;`;
    const sql = await conn.query(cmd, [id]);

    const dado = sql[0];

    res.render('editar.ejs');
});

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

app.listen(port, () => {
    console.log('Servido no ar! Porta:' + port);
});
