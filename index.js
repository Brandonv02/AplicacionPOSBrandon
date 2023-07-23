const express = require('express');
const morgan = require('morgan')
const app = express();
const path = require('path');
const ruta = require('./controller/posController');
const clientes = require('./models/clientes');

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname,'views'));
app.use(morgan("dev"));
app.use(express.urlencoded({extended:true}));
app.use(express.static("static"));

app.use(express.json());

const PORT = 8100;

app.get('/', (req,res)=>{
    res.render('../views/index')
})

app.post('/home', ruta.iniciarSesion);
app.post('/nuevoUsuario', ruta.registerUser);
app.post('/recuperarUsuario', ruta.recPassword);
app.get('/registro', (req, res) => {res.render('register')})
app.get('/login', (req, res) => {res.render('index')})
app.get('/productosvista', (req, res) => {res.render('productos')})
app.post('/agregarproducto', ruta.newproduct);
app.get('/excel', ruta.descargarExcel);
app.get('/grafica', ruta.grafica);
app.get('/listUser',async (req, res) => {
    let listaUsuarios = await clientes.find();
    console.log(listaUsuarios);
        res.render('listausuarios',{
            "userList" : listaUsuarios
        })
    });
app.get('/borrarUser/:id', ruta.borrarUser);

app.listen(PORT, ()=>{
    console.log('estoy en el puerto: ' + PORT);
})