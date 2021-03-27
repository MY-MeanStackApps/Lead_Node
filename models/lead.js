const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,

}, { timestamps: true }, )
module.exports = mongoose.model('lead', schema)