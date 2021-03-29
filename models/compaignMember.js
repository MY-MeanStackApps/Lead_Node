const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    lead: { type: mongoose.Schema.Types.ObjectId, ref: "lead" },
    compaign: { type: mongoose.Schema.Types.ObjectId, ref: "compaign" },
}, { timestamps: true }, )
module.exports = mongoose.model('compaignmember', schema)