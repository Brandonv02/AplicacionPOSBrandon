const conexionBD = require('../config/ConexionBd')

const vendedores = new conexionBD.Schema({
    id:{
        type : Number,
        min:0,
        max:1000
    },
    nombre:{
        type : String,
        require: true,
        default:"Sin nombre"
    },
    telefono: {
        type: String,
        require: true
    }
});

const vendedor = conexionBD.model('vendedor', vendedores)

module.exports = vendedor;