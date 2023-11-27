const express = require('express');
const router = express.Router();

const validateEventCreation = require('../../validations/createEvent');

// * GET all events //

router.get('/', function(req, res, next) {
    res.json({
        message: 'GET /api/events'
    });
});

module.exports = router