const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Event = mongoose.model('Event');
const User = mongoose.model('User');

const validateEventCreation = require('../../validations/event');

// GET /api/events/:id
router.get('/:id', async (req, res, next) => {
    try {
        const event = await Event.findById(req.params.id).populate('host', '_id username')
        await event.populate('attendees', '_id username');
        await event.populate('host', '_id username');
        return res.json(event)
    }
    catch(err) {
        const error = new Error('Event not found');
        error.statusCode = 404;
        error.errors = { message: "No event found with that id" };
        return next(error);
    }
})

// GET /api/events
router.get('/', async (req, res, next) => {
    const events = await Event.find();
    console.log(events)
    return res.json(events);
});

// POST /api/events
router.post('/', validateEventCreation, async (req, res, next) => {
    try {
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

        let user = await User.findOne({_id: req.body.host})
        user.events.push(event._id);
        user.hostedEvents = event._id
        event.attendees.push(user._id)
        await user.save();  
        await event.save();
    
        return res.json(event)
    } catch {
        return res.json({message: 'Could not create event'})
    }
})

// DELETE /api/events/:id
router.delete('/:id', async (req, res, next) => {
    try {
        const event = await Event.findByIdAndDelete(req.params.id)
        if (event) {
            return res.json(event);
        } else {
            return res.json({message: 'event not found'})
        }
    } catch {
        res.json({message: 'error deleting event'});
    }
})

// UPDATE /api/events/:id

router.patch('/:id', validateEventCreation, async (req, res, next) => {
    try {
        const updatedEvent = await Event.findByIdAndUpdate(req.params.id, req.body, {new: true});
        if (updatedEvent) {
            return res.json(updatedEvent);
        } else {
            return res.json({message: 'event not found'});
        }
    } catch {
        return res.json({message: 'error updating event'});
    }
})

module.exports = router