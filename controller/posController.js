const clientes = require('../models/clientes');

exports.cliente = async (req, res)=>{
    let listaClientes = await clientes.find();
    res.json(listaClientes);
};

exports.nuevoCliente = async(req, res) => {
    const nCliente = new clientes({
        id : 1,
        nombre : "PRUEBA 2",
        telefono : 123456,
        ubicacion : "ubicacion",
        historicoDeCompras: 0,
        totalComprado : 50000
    })

    await nCliente.save();

    res.redirect('index')
};

// exports.updatemascota = async(req, res) => {

//     let buscarId = await Mascotas.find({id : req.body.id});
//     let udpdate = await Mascota.updateOne({
//         id: req.body.id,
//         name : req.body.name,
//         raza : req.body.raza
//     })
//     res.redirect('Mascotas')
   
// }

// exports.deletemascota = async(req, res) => {

//     let id = req.params.id;
//     const deleteMasc = await Mascota.findOneAndDelete({"id": id});
//     console.log(deleteMasc)
//     res.redirect('/api/v1/Mascotas')
// }

// Controlador para registrar un nuevo usuario
exports.registerUser = async (req, res) => {
    console.log("INGRESO REGISTRO USUARIO")
  const {   nombre,
            historicoDeCompras,
            id,
            telefono,
            totalComprado,
            ubicacion } = req.body;

    const newUser = new clientes({
      nombre,
      historicoDeCompras,
      id,
      telefono,
      totalComprado,
      ubicacion
    });

    await newUser.save();

    res.status(201).json({ message: 'Usuario registrado exitosamente' });

};
