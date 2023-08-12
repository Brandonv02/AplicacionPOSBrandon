const express = require('express');
const morgan = require('morgan')
const app = express();
const path = require('path');
const ruta = require('./backend/controller/posController');
const clientes = require('./backend/models/clientes');
const producto = require('./backend/models/pruductos');

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname,'./frontend/views'));
app.use(morgan("dev"));
app.use(express.urlencoded({extended:true}));
app.use(express.static("static"));

app.use(express.json());

const PORT = 8100;

app.get('/', (req,res)=>{
    res.render('../views/index')
})

app.get('/cerrarSesion', ruta.cerrrarSesion)
app.post('/home', ruta.iniciarSesion);
app.get('/home', ruta.iniciarSesion);
app.post('/nuevoUsuario', ruta.registerUser);
app.post('/recuperarUsuario', ruta.recPassword);
app.get('/registro', (req, res) => {res.render('register')})
app.get('/login', (req, res) => {res.render('index')})
app.get('/productosvista', (req, res) => {res.render('productos')})
app.get('/profile', (req, res) => {res.render('profile')})
app.post('/agregarproducto', ruta.newproduct);
app.get('/productos',async (req, res) => {
    let listaProdu = await producto.find();
        res.render('productosCrud',{
            "productsList" : listaProdu
        })
    });
app.get('/excel', ruta.descargarExcel);
app.get('/procesarCompra', ruta.compra);
app.get('/grafica', ruta.grafica);
app.get('/listUser',async (req, res) => {
    let listaUsuarios = await clientes.find();
        res.render('listausuarios',{
            "userList" : listaUsuarios
        })
    });
app.post('/actualizarUser', ruta.actualizarUser)
app.post('/actualizarProd', ruta.actualizarProd)
app.get('/borrarUser/:id', ruta.borrarUser);

app.listen(PORT, ()=>{
    console.log('estoy en el puerto: ' + PORT);
})