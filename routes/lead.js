var express = require('express');
var passwordHash = require('password-hash');
const jwt = require("jsonwebtoken");
var router = express.Router();
const LEAD = require('../models/lead');
const COMPAIGN = require('../models/compaign');
const COMPAIGNMEMBER = require('../models/compaignMember');

router.post('/create', async function(req, res, next) {
    // console.log(req.body);
    var isExistemail = await LEAD.findOne({ email: req.body.email });
    var isExistPhone = await LEAD.findOne({ phone: req.body.phone });
    if (isExistemail) {
        res.json({ message: 'email already' });
    } else if (isExistPhone) {
        res.json({ message: 'phone already' });
    } else {
        var leadData = await LEAD.create(req.body);
        res.json({ message: 'success', data: leadData });
    }
})

router.post('/create/csv', async function(req, res, next) {
    // console.log(req.body);
    var alreday = [];
    var store_email = [];
    for (let i = 0; i < req.body.email.length; i++) {
        store_email.push(req.body.email[i]);
        alreday = await LEAD.find({ email: store_email, });
    }
    // console.log(store_lead_temp);
    // console.log(store_com_temp);

    for (let j = 0; j < alreday.length; j++) {
        var deleted = await LEAD.deleteOne({ _id: alreday[j]._id });
    }

    for (let i = 0; i < req.body.lead.length; i++) {
        var comp = await LEAD.create({
            lead: req.body.lead[i]._id,
        });
    }
    res.json({ message: 'success' });
    // console.log(req.body);
    // var isExistemail = await LEAD.findOne({ email: req.body.email });
    // var isExistPhone = await LEAD.findOne({ phone: req.body.phone });
    // if (isExistemail) {
    //     res.json({ message: 'email already' });
    // } else if (isExistPhone) {
    //     res.json({ message: 'phone already' });
    // } else {
    //     var leadData = await LEAD.create(req.body);
    //     res.json({ message: 'success', data: leadData });
    // }
})

router.get('/getall', async function(req, res, next) {
    var fetchLead = await LEAD.find();
    // var Ids = [];
    // var send = [];

    // for (let i = 0; i < fetchLead.length; i++) {
    //     Ids.push(fetchLead[i]._id);
    // }

    // var fetchcomp = await COMPAIGN.find({ lead: Ids });

    // for (let j = 0; j < fetchLead.length; j++) {
    //     for (let k = 0; k < fetchcomp.length; k++) {
    //         console.log(fetchLead[j]._id == fetchcomp[k].lead);
    //         if (fetchLead[j]._id == fetchcomp[k].lead) {
    //             send.push(fetchLead[j], { comp: true });
    //         } else {
    //             send.push(fetchLead[j], { comp: false });
    //         }
    //     }
    // }
    res.json({ message: 'success', data: fetchLead });
})

router.get('/:id', async function(req, res, next) {
    var single = await LEAD.find({ _id: req.params.id });
    res.json({ message: 'success', data: single });
});

router.delete('/:id', async function(req, res, next) {
    var compmem = await COMPAIGNMEMBER.findOne({ lead: req.params.id });
    var del_lead = await LEAD.deleteOne({ _id: req.params.id });
    if (compmem) {
        var del_compaignMember = await COMPAIGNMEMBER.deleteOne({ _id: compmem._id });
    }
    res.json({ message: 'success' });
});

router.post('/update', async function(req, res, next) {

    LEAD.findOne({ _id: req.body.id }).then(fetch => {
        if (fetch.email == req.body.email) {
            LEAD.updateOne({
                _id: req.body.id
            }, {
                $set: {
                    name: req.body.name,
                    email: req.body.email,
                    phone: req.body.phone,
                }
            }).then(fetch => {
                res.json({ message: 'success' })
            });
        } else if (fetch.email != req.body.email) {
            LEAD.findOne({ email: req.body.email }).then(isExist => {
                if (isExist) {
                    res.json({ message: 'email already taken' })
                } else {
                    LEAD.updateOne({
                        _id: req.body.id
                    }, {
                        $set: {
                            name: req.body.name,
                            email: req.body.email,
                            phone: req.body.phone,
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