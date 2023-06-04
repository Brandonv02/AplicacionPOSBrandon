const clientes = require('../models/clientes');
const nodemailer = require('nodemailer');
const producto = require('../models/pruductos');

exports.iniciarSesion = async (req, res)=>{
    let buscarUser = await clientes.findOne({nombre : req.body.nombre});
    if(buscarUser.length === 0) {   
        console.log("No existe usuario");
        res.render('index');
    } else if(buscarUser.contrasena === req.body.contrasena){
        let listaProducto = await producto.find();
        res.render('landing', {
            "listProd" : listaProducto
        })
    } else {
        console.log('Contraseña incorrecta');
        res.render('index');
    }
};

exports.recPassword = async(req, res) => {
    let recuperar = await clientes.findOne({nombre : req.body.nombre});
    if(recuperar === null){
        console.log("No existe")

        res.end();
    }else{
        correoUsuario = recuperar.correo;
    }  
    
    var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth:{
            user: 'bkvides@misena.edu.co',
            pass: 'suopznpiybmsrnsx'
        }
    });
    var mailOptions = {
        from : 'Remitente',
        to : correoUsuario,
        subject: 'Recuperacion de contraseña',
        text: 'Su contraseña es 231546'
    }
    
    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            console.log(error);
            
        }
        else {
            console.log("Email Sent to: "+correoUsuario);
            res.render('index');
        }
    })
}

// Controlador para registrar un nuevo usuario

exports.registerUser = async (req, res) => {
    const newUser = new clientes({
      nombre : req.body.nombre,
      telefono: req.body.telefono,
      correo : req.body.correo,
      ubicacion : {
        centro : req.body.centro,
        zoom : req.body.zoom
      },
      contrasena: req.body.contrasena
    });

    await newUser.save();
    res.redirect('login');
};

exports.homepage = async (req, res) => {

}



exports.productos = async (req,res)=>{
    let listaProducto = await producto.find();
    console.log(listaProducto, "lista producto")
    res.render('../views/landing',{
        "listProd" : listaProducto
    })
};

exports.newproduct = async(req, res) => {
    console.log(req.body);
    const nuevoproducto = new producto({
        nombre : req.body.nombre,
        referencia : req.body.Referencia,
        descripcion : req.body.Descripción,
        precio : req.body.precio,
        stock : req.body.Stock,
        imagen : req.body.imagen,
        habilitado : true
    })
    await nuevoproducto.save();

    res.redirect('productosvista')
}