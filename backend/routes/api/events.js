const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Event = mongoose.model('Event');


const validateEventCreation = require('../../validations/createEvent');

// * GET all events //

router.get('/', function(req, res, next) {
    res.json({
        message: 'GET /api/events'
    });
});

// * POST /api/events/create //

router.post('/create', validateEventCreation, async (req, res, next) => {
    const newEvent = new Event({
        title: req.body.title,
        description: req.body.description,
        language: req.body.language,
        state: req.body.state,
        city: req.body.city,
        address: req.body.address,
        zipcode: req.body.zipcode,
        lat: req.body.lat,
        long: req.body.long,
        date: req.body.date,
        time: req.body.time,
        host: req.body.host,
        attendees: req.body.attendees
    })

    let event = await newEvent.save();

    // event = await newEvent.populate('attendees');
    // console.log(newEvent.populated('attendees') ? 'populated' : 'not populated')

    // console.log(newEvent)

    return res.json(event)
})

module.exports = router