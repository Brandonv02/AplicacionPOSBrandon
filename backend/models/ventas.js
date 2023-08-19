const conexionBD = require("../config/ConexionBd");

const ventas = new conexionBD.Schema({
  producto: {
    type: String,
    require: true,
    default: "Sin nombre"
  },
  subtotal: {
    type: Number,
    require: true
  },
  fecha: {
    type: Date,
    require: true
  },
  impuesto: {
    type: Number,
    require: true
  },
  total: {
    type: Number,
    require: true
  },
  cliente: {
    type: String,
    require: true
  },
  vendedor: {
    type: String,
    require: true
  }
});

const Ventas = conexionBD.model("ventas", ventas);

module.exports = Ventas;
