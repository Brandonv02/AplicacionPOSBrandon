const express = require('express');
const morgan = require('morgan')
const app = express();
const path = require('path');
// const rutas = require('./router/enrutamiento');
const dotenv = require('dotenv');
const ruta = require('./controller/posController');

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname,'views'));
app.use(morgan("dev"));
app.use(express.urlencoded({extended:true}));

app.use(express.json());
// app.use('/api',rutas);

const PORT = 8100;

app.get('/', (req,res)=>{
    res.render('../views/index')
})

app.get('/getDatos', ruta.cliente);
app.get('/newDato', ruta.nuevoCliente);
app.post('/nuevoUsuario', ruta.registerUser);
app.get('/registro', (req, res) => {res.render('register')})
app.get('/login', (req, res) => {res.render('index')})

app.listen(PORT, ()=>{
    console.log('estoy en el puerto: ' + PORT);
})