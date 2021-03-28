const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    name: String,
    email: String,
    compaigndate: String,
    lead: { type: mongoose.Schema.Types.ObjectId, ref: "lead" },
}, { timestamps: true }, )
module.exports = mongoose.model('compaign', schema)