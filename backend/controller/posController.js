const Cliente = require("../models/clientes");
const Producto = require("../models/pruductos");
const { consultac } = require("../use-cases/casosDeUso.js");
const nodemailer = require("nodemailer");
const xl = require("excel4node");
const path = require("path");
const fs = require("fs");

exports.iniciarSesion = async (req, res) => {
  const user = req.body.nombre;
  const pass = req.body.contrasena;
  consultac(user, pass).then(
    async (value) => {
      if (value.contrasena === pass) {
        const listaProducto = await Producto.find().limit(15);
        res.render("landing", {
          listProd: listaProducto
        });
      } else {
        res.json(value.msg);
      }
    });
};

exports.cerrrarSesion = () => {

};

exports.borrarUser = async (req, res) => {
  await Cliente.findByIdAndDelete({ _id: req.params.id });
  res.redirect("/listUser");
};

exports.borrarProduc = async (req, res) => {
  await Producto.findByIdAndDelete({ _id: req.params.id });
  res.redirect("/productos");
};

exports.recPassword = async (req, res) => {
  const recuperar = await Cliente.findOne({ nombre: req.body.nombre });
  const pass = recuperar.contrasena;
  if (recuperar === null) {
    console.log("No existe");
    res.end();
  } else {
    const correoUsuario = recuperar.correo;
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: "bkvides@misena.edu.co",
        pass: "suopznpiybmsrnsx"
      }
    });
    const mailOptions = {
      from: "Remitente",
      to: correoUsuario,
      subject: "Recuperacion de contraseña",
      text: "Su contraseña es: " + pass
    };

    transporter.sendMail(mailOptions, function (error) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email Sent to: " + correoUsuario);
      }
    });
  }
  res.render("../views/index");
};

// Controlador para registrar un nuevo usuario
exports.registerUser = async (req, res) => {
  const newUser = new Cliente({
    nombre: req.body.nombre,
    telefono: req.body.telefono,
    correo: req.body.correo,
    rol: req.body.rol,
    ubicacion: {
      centro: req.body.centro,
      zoom: req.body.zoom
    },
    contrasena: req.body.contrasena
  });

  await newUser.save();
  res.redirect("login");
};

exports.homepage = async (req, res) => {

};

exports.productos = async (req, res) => {
  const listaProducto = await Producto.find();
  res.render("../views/landing", {
    listProd: listaProducto
  });
};

exports.grafica = async (req, res) => {
  const productosGrafica = await Producto.find({}, { nombre: 1, stock: 1, _id: 0 });
  // let stockProducto = await producto.find({},{stock:1,_id:0});
  // let arrayNombre=[1,2,3,4];
  // let arrayStock=[100,11,50,155];
  // let arr = Array.from(arrayNombre);
  // let arr2 = Array.from(arrayStock);
  // const valorProd = nombreProducto.map(element => {
  //     // console.log(element.nombre)
  //     arrayNombre.push(element.nombre)
  // })
  // const valorStock = stockProducto.map(element => {
  //     // console.log(element.stock)
  //     arrayStock.push(element.stock)
  // })

  res.render("../views/grafica", {
    productosGrafica
  });
};

exports.newproduct = async (req, res) => {
  const produc = req.body.Referencia;
  await Producto.findOne({ Referencia: produc });

  const nuevoproducto = new Producto({
    nombre: req.body.nombre,
    referencia: req.body.Referencia,
    descripcion: req.body.Descripción,
    precio: req.body.precio,
    stock: req.body.Stock,
    imagen: req.body.imagen,
    habilitado: true
  });
  await nuevoproducto.save();

  res.redirect("productosvista");
};

exports.descargarExcel = async (req, res) => {
  // configuramos el excel4node

  // creamos un nuevo documento
  const wb = new xl.Workbook();
  // definimos el nombre con el cual se descargara el archivo
  const nombreArchivo = "TablaProductos";
  // se define el nombre
  const ws = wb.addWorksheet(nombreArchivo);

  // definimos estilos
  const columnaEstilo = wb.createStyle({
    font: {
      name: "Arial",
      color: "#000000",
      size: 12,
      bold: true
    }
  });

  const contenidoEstilo = wb.createStyle({
    font: {
      name: "Arial",
      color: "#565656",
      size: 11
    }
  });

  // definimos el nombre de las columnas
  ws.cell(1, 1).string("referencia").style(columnaEstilo);
  ws.cell(1, 2).string("Nombre").style(columnaEstilo);
  ws.cell(1, 3).string("Descripcion").style(columnaEstilo);
  ws.cell(1, 4).string("Precio").style(columnaEstilo);

  // llamamos a la base de datos
  const listaProductos = await Producto.find();

  // definimos un contador que empiece en 2
  let fila = 2;

  // agregamos el contenido de la base de datos con un for o un forEach para llamar todos los datos

  listaProductos.forEach(datoProducto => {
    ws.cell(fila, 1).string(datoProducto.referencia).style(contenidoEstilo);
    ws.cell(fila, 2).string(datoProducto.nombre).style(contenidoEstilo);
    ws.cell(fila, 3).string(datoProducto.descripcion).style(contenidoEstilo);
    ws.cell(fila, 4).number(datoProducto.precio).style(contenidoEstilo);

    fila = fila + 1;
  });

  const rutaExcel = path.join(__dirname, "excel" + nombreArchivo + ".xlsx");

  // escribir y guardar en el documento
  // se le inclulle la ruta y una funcion
  wb.write(rutaExcel, function (err, stars) {
    // capturamos y mostramos en caso de un error
    if (err)console.log(err);
    // creamos una funcion que descargue el archivo y lo elimine
    else {
      // guardamos el documento en la carpeta para excel para poder descargarla en el pc
      res.download(rutaExcel);
      console.log("documento descargado correctamente");

      // Eliminamos el documento de la carpeta excel
      fs.rm(rutaExcel, function (err) {
        if (err)console.log(err);
        else console.log("Archivo descargado y borrado del servidor correctamente");
      });
    }
  });
};

exports.actualizarUser = async (req, res) => {
  const idUser = req.body.id;
  await Cliente.findByIdAndUpdate(idUser, req.body);

  res.redirect("/listUser");
};

exports.actualizarProd = async (req, res) => {
  const idProd = req.body.id;
  await Producto.findByIdAndUpdate(idProd, req.body);

  res.redirect("/productos");
};

exports.compra = async (req, res) => {
  console.log("ingreso");
};
