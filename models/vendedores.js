const conexionBD = require('../config/ConexionBd')

const vendedores = new conexionBD.Schema({
    documento:{
        type : Number,
        min:0,
        max:1000
    },
    nombre:{
        type : String,
        require: true,
        default:"Sin nombre"
    },
    correo: {
        type: String,
        require: true
    },
    ventas: { 
        type: String
    }
});

const vendedor = conexionBD.model('vendedor', vendedores)

module.exports = vendedor;