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
        type : String,
        default: "https://source.unsplash.com/featured/300x201"
    },
    habilitado: { 
        type: Boolean,
        default: true
    }
});

const producto = conexionBD.model('productos', productos)

module.exports = producto;