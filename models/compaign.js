const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    name: String,
    email: String,
    compaigndate: String,
}, { timestamps: true }, )
module.exports = mongoose.model('compaign', schema)