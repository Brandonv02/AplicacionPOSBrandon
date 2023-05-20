const enrutmascota = require('../controller/macotas');
const express = require('express')
const route = express.Router();

route.get('/mascotas', enrutmascota.mascotas);
route.post('/mascotas', enrutmascota.newmascota);
route.post('/MascotasUpdate',enrutmascota.updatemascota);
route.get('/MascotasDelete/:id',enrutmascota.deletemascota);

module.exports = route;