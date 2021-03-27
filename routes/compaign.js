var express = require('express');
var passwordHash = require('password-hash');
const jwt = require("jsonwebtoken");
var router = express.Router();
const COMPAIGN = require('../models/compaign');
const LEAD = require('../models/lead');

router.post('/create', async function(req, res, next) {
    var isExist = await COMPAIGN.findOne({ lead: req.body.lead });
    if (isExist) {
        res.json({ message: 'lead already' });
    } else {
        var comp = await COMPAIGN.create(req.body);
        res.json({ message: 'success', data: comp });
    }
})

router.get('/getall', async function(req, res, next) {
    var fetchall = await COMPAIGN.find().populate('lead');
    res.json({ message: 'success', data: fetchall });
})

router.get('/:id', async function(req, res, next) {
    var singleComp = await COMPAIGN.find({ _id: req.params.id });
    res.json({ message: 'success', data: singleComp });
})

router.delete('/:id', async function(req, res, next) {
    var comp = await COMPAIGN.deleteOne({ _id: req.params.id });
    res.json({ message: 'success' })

});


module.exports = router;