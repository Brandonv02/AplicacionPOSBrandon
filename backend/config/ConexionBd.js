const mongoose = require("mongoose");

const uri = "mongodb+srv://BrandonADSI:zIPn0YCRfatwauCU@clusteradsi2498009.ip1iwz8.mongodb.net/PosBrandon";

mongoose.connect(uri, { useNewUrlParser: true });

module.exports = mongoose;
