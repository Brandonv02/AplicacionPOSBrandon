const conexionBD = require('../config/ConexionBd')

const ShemaMascota = new conexionBD.Schema({
    id:{
        type : Number,
        min:0,
        max:1000
    },
    name:{
        type : String,
        require: true,
        default:"Sin nombre"
    },
    raza: {
        type: String,
        require: true
    }
});

const Mascota = conexionBD.model('Mascota', ShemaMascota)

module.exports = Mascota;