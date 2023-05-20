const Mascota = require('../models/mascotas');
const Mascotas = require('../models/mascotas');

exports.mascotas = async (req,res)=>{
    let listaMascotas = await Mascotas.find();
    res.render('../views/Mascota',{
        "listado" : listaMascotas
    })
};

exports.newmascota = async(req, res) => {
    const mascotas = new Mascota({
        id : req.body.id,
        name : req.body.name,
        raza : req.body.raza
    })
    await mascotas.save();

    res.redirect('Mascotas')
}

exports.updatemascota = async(req, res) => {

    let buscarId = await Mascotas.find({id : req.body.id});
    let udpdate = await Mascota.updateOne({
        id: req.body.id,
        name : req.body.name,
        raza : req.body.raza
    })
    res.redirect('Mascotas')

    
}

exports.deletemascota = async(req, res) => {

    let id = req.params.id;
    const deleteMasc = await Mascota.findOneAndDelete({"id": id});
    console.log(deleteMasc)
    res.redirect('/api/v1/Mascotas')
}