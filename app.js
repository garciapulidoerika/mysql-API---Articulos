const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const conexion = mysql.createConnection({
    host:'localhost',
    user: 'root',
    password:'1234',
    database: 'articulos',
})


conexion.connect(function(error){
    if(error){
        throw error;
    }else{
        console.log('conex exitosa')
    }
})

app.get('/', function(req, res){
    res.send('ruta get');
});

app.get('/api/articulos', (req,res)=>{
    conexion.query('SELECT * FROM articulos', (error, filas)=>{
        if(error){
            throw error;
        }else{
            res.send(filas);
        }
    })
});

app.get('/api/articulos/:id', (req,res)=>{
    conexion.query('SELECT * FROM articulos WHERE id=?', [req.params.id], (error, fila)=>{
        if(error){
            throw error;
        }else{
            res.send(fila);
        }
    })
});

app.post('/api/articulos', (req,res)=>{
    let data = {
        descripcion:req.body.descripcion, 
        precio:req.body.precio, 
        stock:req.body.stock
    }
    let sql = 'INSERT INTO articulos SET ?';

    conexion.query(sql, data, function(error, results){
        if(error){
            throw error;
        }else{
            res.send(results);  // aqui manda unas vainas raras pero esta bien
        }
    })
});

app.put('/api/articulos/:id', (req,res)=>{
    let id = req.params.id;
    let descripcion = req.body.descripcion;
    let precio = req.body.precio;
    let stock = req.body.stock;
    let sql = "UPDATE articulos SET descripcion = ?, precio = ?, stock = ? WHERE id = ?";
    conexion.query(sql, [descripcion, precio, stock, id], function(error, results){
        if(error){
            throw error;
        }else{
            res.send(results);
        }
    })
});

app.delete('/api/articulos/:id', (req,res)=>{
    let id = req.params.id;
    
    conexion.query('DELETE FROM articulos WHERE id = ?', [id], function(error, filas){
        if(error){
            throw error;
        }else{
            res.send(filas);
        }
    })
});

//crear variable de entorno
const puerto = process.env.PUERTO || 4000;

app.listen(puerto, function(){
    console.log('servidor ok en puerto:'+puerto)
})


