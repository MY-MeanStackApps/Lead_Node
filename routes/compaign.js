var express = require('express');
var passwordHash = require('password-hash');
const jwt = require("jsonwebtoken");
var router = express.Router();
const COMPAIGN = require('../models/compaign');
const LEAD = require('../models/lead');

router.post('/create', async function(req, res, next) {
    var comp = await COMPAIGN.create(req.body);
    res.json({ message: 'success', data: comp });
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

router.post('/update', async function(req, res, next) {

    COMPAIGN.findOne({ _id: req.body.id }).then(fetch => {
        if (fetch.email == req.body.email) {
            COMPAIGN.updateOne({
                _id: req.body.id
            }, {
                $set: {
                    name: req.body.name,
                    email: req.body.email,
                }
            }).then(fetch => {
                res.json({ message: 'success' })
            });
        } else if (fetch.email != req.body.email) {
            COMPAIGN.findOne({ email: req.body.email }).then(isExist => {
                if (isExist) {
                    res.json({ message: 'email already taken' })
                } else {
                    COMPAIGN.updateOne({
                        _id: req.body.id
                    }, {
                        $set: {
                            name: req.body.name,
                            email: req.body.email,
                        }
                    }).then(fetch => {
                        res.json({ message: 'success' })
                    });
                }
            });
        }
    });
});

module.exports = router;