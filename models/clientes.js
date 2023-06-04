const conexionBD = require('../config/ConexionBd')

const clientes = new conexionBD.Schema({
    nombre:{
        type : String,
        require: true,
        default:"Sin nombre"
    },
    correo:{
        type: String,
        require: true,
    },
    telefono: {
        type: String,
        require: true
    },
    ubicacion : {
        centro : {
            type: Number,
            default:0
        },
        zoom : {
            type: Number,
            default:0
        }
    },
    totalComprado : {
        type : Number,
        default:0
    },
    historicoDeCompras : {
        type : Number,
        default:0
    },
    contrasena : { 
        type : String,
        require: true
    }
});

const cliente = conexionBD.model('clientes', clientes)

module.exports = cliente;