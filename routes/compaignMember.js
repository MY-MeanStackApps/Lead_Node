var express = require('express');
var router = express.Router();
const COMPAIGNMEMBER = require('../models/compaignMember');
const LEAD = require('../models/lead');
const COMPAIGN = require('../models/compaign');

router.post('/create', async function(req, res, next) {
    for (let i = 0; i < req.body.lead.length; i++) {
        var comp = await COMPAIGNMEMBER.create({
            lead: req.body.lead[i]._id,
            compaign: req.body.compaign
        });
    }
    res.json({ message: 'success' });
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