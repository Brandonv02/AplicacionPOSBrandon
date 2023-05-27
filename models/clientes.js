const conexionBD = require('../config/ConexionBd')

const clientes = new conexionBD.Schema({
    nombre:{
        type : String,
        require: true,
        default:"Sin nombre"
    },
    telefono: {
        type: String,
        require: true
    },
    ubicacion : {
        centro : {
            type: Number,
        },
        zoom : {
            type: Number
        }
    },
    totalComprado : {
        type : Number
    },
    historicoDeCompras : {
        type : Number
    }
});

const cliente = conexionBD.model('clientes', clientes)

module.exports = cliente;