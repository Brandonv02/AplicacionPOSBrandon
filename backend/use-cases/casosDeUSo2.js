const clientes = require('../models/clientes');

exports.consultac = (req,res,next) => {
    console.log(typeof clientes)
    console.log(clientes.length)
    let consultaCliente = clientes.findOne({"nombre": "admin"});
    console.log(consultaCliente,"dfhdfgdfgdf");
    if (consultaCliente) {
        res.status(200).json({datos: consultaCliente})
    }else{
        res.status(400).json({res:"error"})
    }
}

