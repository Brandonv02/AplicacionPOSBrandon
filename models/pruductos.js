const conexionBD = require('../config/ConexionBd')

const productos = new conexionBD.Schema({
    referencia:{
        type : Number,
        min:0,
        max:1000
    },
    nombre:{
        type : String,
        require: true,
        default:"Sin nombre"
    },
    descripcion: {
        type: String,
        require: true
    },
    precio : {
        type: Number,
        require: true
    },
    stock : {
        type : Number
    },
    imagen : {

    },
    habilitado: { 
        type: Boolean
    }
});

const producto = conexionBD.model('productos', productos)

module.exports = producto;