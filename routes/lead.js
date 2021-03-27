var express = require('express');
var passwordHash = require('password-hash');
const jwt = require("jsonwebtoken");
var router = express.Router();
const LEAD = require('../models/lead');

router.post('/create', async function(req, res, next) {
    console.log(req.body)
    var isExist = await LEAD.findOne({ email: req.body.email });
    if (isExist) {
        res.json({ message: 'email already' });
    } else {
        var leadData = await LEAD.create(req.body);
        res.json({ message: 'success', data: leadData });
    }
})

router.get('/getall', async function(req, res, next) {
    var fetchLead = await LEAD.find();
    res.json({ message: 'success', data: fetchLead });
})

router.get('/:id', async function(req, res, next) {
    var single = await LEAD.find({ _id: req.params.id });
    res.json({ message: 'success', data: single });
})


module.exports = router;