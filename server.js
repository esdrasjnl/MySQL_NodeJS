const express = require('express');
const mysql = require('mysql');

const bodyparser = require('body-parser');

const PORT = process.env.PORT || 4000;

const app = express();

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

//Conexión a MySQL

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '110896',
    database: 'bdgricel'
});

//Check connect
connection.connect(error=>{
    if(error) throw error;
    console.log('Base de datos ejecutandose!');
});

app.listen(PORT, ()=>{
    console.log(`Servidor Corriendo en el puerto ${PORT}`);
});

//Route
app.get('/', (req, res)=>{
    res.send('Bienvenido a mi API');
});

//All customers
app.get('/customers', (req, res) => {
    const sql = 'select * from usuario';

    connection.query(sql, (error, results) => {
        if(error) throw error;
        if(results.length > 0){
            res.json(results);
        } else {
            res.send('No hay resultados');
        }
    });
});

app.get('/customers/:id', (req, res) => {
    const { id } = req.params;
    const sql = `select * from usuario where idusuariocle = ${id}`;
    connection.query(sql, (error, result) => {
        if(error) throw error;
        if(result.length > 0){
            res.json(result);
        } else {
            res.send('No hay resultados');
        }
    });
});

app.post('/add', (req, res) =>{
    const sql = 'insert into usuario set?';

    const customerObj = {
        nombreusuario: req.body.nombreusuario,
        primernombre: req.body.primernombre,
        segundonombre: req.body.segundonombre,
        primerapellido: req.body.primerapellido,
        segundoapellido: req.body.segundoapellido,
        direccion: req.body.direccion,
        telefono: req.body.telefono,
        correo: req.body.correo,
        fotografia: req.body.fotografia,
        idrol: req.body.idrol
    };

    connection.query(sql, customerObj, error => {
        if(error) throw error;
        res.send('Usuario Creado');
    });
});

app.put('/update/:idusuario', (req, res) =>{
    const { idusuario } = req.params;
    const {nombreusuario, primernombre, segundonombre, primerapellido, segundoapellido, direccion, telefono, correo} = req.body;
    const sql = `update usuario set nombreusuario = '${nombreusuario}', primernombre = '${primernombre}', segundonombre = '${segundonombre}', 
    primerapellido = '${primerapellido}', segundoapellido = '${segundoapellido}', direccion = '${direccion}', telefono = '${telefono}', 
    correo = '${correo}' where idusuario = '${idusuario}' `;

    connection.query(sql, error => {
        if(error) throw error;
        res.send('Usuario Actualizado');
    });
});

app.delete('/delete/:idusuario', (req, res) =>{
    const { idusuario } = req.params;
    const sql = `delete from usuario where idusuario = ${idusuario}`;

    connection.query(sql, error => {
        if(error) throw error;
        res.send('Usuario Eliminado');
    });
});


