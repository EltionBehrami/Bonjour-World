const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const User = mongoose.model('User');
const Event = mongoose.model('Event');
const passport = require('passport');
const { loginUser, restoreUser } = require('../../config/passport');
const { isProduction } = require('../../config/keys');

const validateRegisterInput = require('../../validations/register');
const validateLoginInput = require('../../validations/login');
const validateUserInput = require('../../validations/user');

/* GET users listing. */
router.get('/', async (req, res, next) => {
  const users = await User.find();
  res.json(users);
});

// GET /api/users/:id
router.get('/:id', async (req, res, next) => {
  const user = await User.findById(req.params.id);
  const events = await Event.find({})
})

// GET /api/users/current
router.get('/current', restoreUser, (req, res) => {
  if (!isProduction) {
    // In development, allow React server to gain access to the CSRF token
    // whenever the current user information is first loaded into the
    // React application
    const csrfToken = req.csrfToken();
    res.cookie("CSRF-TOKEN", csrfToken);
  }
  if (!req.user) return res.json(null);
  res.json({
    _id: req.user._id,
    username: req.user.username,
    email: req.user.email
  });
});

// POST /api/users/register
router.post('/register', validateRegisterInput, async (req, res, next) => {
  // Check to make sure no one has already registered with the proposed email or
  // username.
  const user = await User.findOne({
    $or: [{ email: req.body.email }, { username: req.body.username }]
  });
  console.log(user)

  if (user) {
    // Throw a 400 error if the email address and/or username already exists
    const err = new Error("Validation Error");
    err.statusCode = 400;
    const errors = {};
    if (user.email === req.body.email) {
      errors.email = "A user has already registered with this email";
    }
    if (user.username === req.body.username) {
      errors.username = "A user has already registered with this username";
    }
    err.errors = errors;
    return next(err);
  }

  // Otherwise create a new user
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    age: req.body.age
  });

  bcrypt.genSalt(10, (err, salt) => {
    if (err) throw err;
    bcrypt.hash(req.body.password, salt, async (err, hashedPassword) => {
      if (err) throw err;
      try {
        newUser.hashedPassword = hashedPassword;
        const user = await newUser.save();
        return res.json(await loginUser(user)); // <-- THIS IS THE CHANGED LINE
      }
      catch(err) {
        next(err);
      }
    })
  });
});

// POST /api/users/login
router.post('/login', validateLoginInput, async (req, res, next) => {
  passport.authenticate('local', async function(err, user) {
    if (err) return next(err);
    if (!user) {
      const err = new Error('Invalid credentials');
      err.statusCode = 400;
      err.errors = { email: "Invalid credentials" };
      return next(err);
    }
    return res.json(await loginUser(user)); // <-- THIS IS THE CHANGED LINE
  })(req, res, next);
});

// UPDATE /api/users/:id
router.patch('/:id', validateUserInput, async (req, res, next) => {
  try {
    let user = await User.findOneAndUpdate({_id: req.params.id}, req.body, {new: true});
    user = await user.populate('events');
    console.log(user)
    return res.json(user);
  } catch {
    res.json({message: 'error updating user'});
  }
})

// POST /api/users/:id/events/:id (post a many to many relationship)
router.post('/:userId/events/:eventId', async(req, res, next) => {
  try {
    const user = await User.findById(req.params.userId);
    const event = await Event.findById(req.params.eventId);
    if (!user || !event) {
      return res.json({message: 'User or Event not found'});
    }
    user.events.push(req.params.eventId);
    event.attendees.push(req.params.userId);
    await user.save();
    await event.save();
    return res.json({message: 'User added to event'});
  } catch {
    return res.json({message: 'Error adding user to event'})
  }
})

// DELETE /api/users/:id/events/:id (delete a many to many relationship)
router.delete('/:userId/events/:eventId', async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userId);
    const event = await Event.findById(req.params.eventId);
    if (!user || !event) {
      return res.json({message: 'User or Event not found'});
    }
    user.events.pull(req.params.eventId);
    event.attendees.pull(req.params.userId);
    await user.save();
    await event.save();


    return res.json({message: 'Event deleted for user'});
  } catch {
    return res.json({message: 'Error deleting event for user'})
  }
})

// DELETE /api/users/:id
router.delete('/:id', async (req, res, next) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id)
    if (user) {
        return res.json(user);
    } else {
        return res.json({message: 'user not found'})
    }
} catch {
    res.json({message: 'error deleting user'});
}
})

module.exports = router;
