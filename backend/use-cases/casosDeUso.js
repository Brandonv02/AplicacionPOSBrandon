const cliente = require('../models/clientes')

exports.consultac = async (usr,pass) => {
    let consultaCliente = {}; 
    consultaCliente = await cliente.findOne( { "nombre" : usr } );
        if (consultaCliente.nombre === usr) {
            if (consultaCliente.contrasena === pass){
                return consultaCliente;
            }else{
                return {"msg": "Contraseña incorrecta"};
            }
        }else{
            return {"msg": "No existe el usuario"};
        }
}

