const express = require('express');
const logger = require('morgan')
const app = express();
const path = require('path');
const Mascota = require('./models/mascotas');
const Mascotas = require('./models/mascotas');
const elrouter = require('./router/enrutamiento');
const dotenv = require('dotenv');
dotenv.config();

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname,'views'));
app.use(logger("dev"));
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use('/api/v1/',elrouter)

const PORT = process.env.PORT;

app.get('/', (req,res)=>{
    res.send('primera peticion');
    res.end();  
})

// app.get('/Mascotas/:id', (req, res) => {

//     const id = req.params.id
//     // const variab = document.getElementById("id").value

//     // variab = id
//     // const mascotas = new Mascota({
//     //     id : req.body.id,
//     //     name : req.body.name,
//     //     raza : req.body.raza
//     // })
    
// })

app.listen(PORT, ()=>{
    console.log('estoy en el puerto: ' + PORT);
})