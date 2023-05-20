const mongoose = require('mongoose')

const uri ='mongodb+srv://BrandonADSI:zIPn0YCRfatwauCU@clusteradsi2498009.ip1iwz8.mongodb.net/Mascotas'; 
// const parameters = {
//     usuario: process.env.DB_USERNAME,
//     pass: process.env.DB_PASSWORD,
//     namebd: process.env.DB_NAME
// }
mongoose.connect(uri, { useNewUrlParser: true });

module.exports = mongoose;