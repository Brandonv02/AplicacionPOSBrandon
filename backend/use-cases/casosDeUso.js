const {consulta} = require('../models/clientes')

exports.consultac = (req,res,next) => {
    console.log(typeof consulta)
    console.log(consulta.length)
    let consultaCliente = consulta.findOne({"nombre": "admin"});
    console.log(consultaCliente,"dfhdfgdfgdf");
    if (consultaCliente) {
        res.status(200).json({datos: consultaCliente})
    }else{
        res.status(400).json({res:"error"})
    }
}
