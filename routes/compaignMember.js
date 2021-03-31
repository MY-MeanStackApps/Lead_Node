var express = require('express');
var router = express.Router();
const COMPAIGNMEMBER = require('../models/compaignMember');
const LEAD = require('../models/lead');
const COMPAIGN = require('../models/compaign');

router.post('/create', async function(req, res, next) {
    var alreday = [];
    var store_lead_temp = [];
    var store_com_temp = [];
    for (let i = 0; i < req.body.lead.length; i++) {
        store_lead_temp.push(req.body.lead[i]._id);
        store_com_temp.push(req.body.compaign);
        alreday = await COMPAIGNMEMBER.find({ lead: store_lead_temp, compaign: store_com_temp });
    }
    for (let j = 0; j < alreday.length; j++) {
        var deleted = await COMPAIGNMEMBER.deleteOne({ _id: alreday[j]._id });
    }

    for (let i = 0; i < req.body.lead.length; i++) {
        var comp = await COMPAIGNMEMBER.create({
            lead: req.body.lead[i]._id,
            compaign: req.body.compaign
        });
    }
    if (alreday.length >= 1) {
        res.json({ message: 'success', alert: 1 });
    } else {
        res.json({ message: 'success', alert: 0 });
    }
})

router.get('/getall/:compId', async function(req, res, next) {
    var fetchall = await COMPAIGNMEMBER.find({ compaign: req.params.compId }).populate('lead compaign');
    res.json({ message: 'success', data: fetchall });
})

router.delete('/:id', async function(req, res, next) {
    var comp = await COMPAIGNMEMBER.deleteOne({ _id: req.params.id });
    res.json({ message: 'success' })
});

module.exports = router;