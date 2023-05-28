const clientes = require('../models/clientes');
const nodemailer = require('nodemailer');

exports.iniciarSesion = async (req, res)=>{
    let buscarUser = await clientes.findOne({nombre : req.body.nombre});
    console.log(buscarUser);
    if(buscarUser.length === 0) {   
        console.log("No existe usuario");
        res.render('index');
    } else if(buscarUser.contraseña === req.body.contraseña){
        res.render('landing')
    } else {
        console.log('Contraseña incorrecta');
        res.render('index');
    }
};

exports.recPassword = async(req, res) => {
    let recuperar = await clientes.findOne({nombre : req.body.nombre});
    console.log(recuperar)
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

// exports. = async(req, res) => {

//     let id = req.params.id;
//     const deleteMasc = await Mascota.findOneAndDelete({"id": id});
//     console.log(deleteMasc)
//     res.redirect('/api/v1/Mascotas')
// }

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
      contraseña: req.body.contraseña
    });

    await newUser.save();
    res.redirect('login');
};
