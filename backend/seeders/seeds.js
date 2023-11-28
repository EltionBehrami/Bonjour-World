const mongoose = require("mongoose");
const { mongoURI: db } = require('../config/keys.js');
const User = require('../models/User');
const Event = require('../models/Event');
const bcrypt = require('bcryptjs');
const { faker } = require('@faker-js/faker');

const NUM_SEED_USERS = 10;
const NUM_SEED_EVENTS = 30;

function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
}

// Create users
const users = [];

users.push(
  new User ({
    username: 'demo-user',
    email: 'demo-user@appacademy.io',
    hashedPassword: bcrypt.hashSync('starwars', 10),
    firstName: "Demo",
    lastName: "Lition"
  })
)

for (let i = 1; i < NUM_SEED_USERS; i++) {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  users.push(
    new User ({
      username: faker.internet.userName({firstName, lastName}),
      email: faker.internet.email({firstName, lastName}),
      hashedPassword: bcrypt.hashSync(faker.internet.password(), 10),
      firstName: firstName,
      lastName: lastName
    })
  )
}
  
// Create events
const events = [];

for (let i = 0; i < NUM_SEED_EVENTS; i++) {
  events.push(
    new Event ({
      title: faker.company.name(),
      description: faker.lorem.sentences(),
      language: ['English','Spanish','French','German'][Math.floor(Math.random() * 4)],
      state: faker.location.state(),
      city: faker.location.city(),
      address: faker.location.streetAddress(),
      zipcode: parseInt(faker.location.zipCode()),
      lat: faker.number.float(),
      long: faker.number.float(),
      date: formatDate(faker.date.future()),
      time: "00:00",
      host: "65663b3fc93e20786445b515"
    })
  )
}

mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => {
    console.log('Connected to MongoDB successfully');
    insertSeeds();
  })
  .catch(err => {
    console.error(err.stack);
    process.exit(1);
  });

const insertSeeds = () => {
    console.log("Resetting db and seeding users and events...");
  
    Event.collection.drop()
      .then(() => User.collection.drop())
      .then(() => User.insertMany(users))
      .then(() => events.forEach((event) => {
        let user = User.findOne({username: "demo-user"});
        event.host = user._id;
        console.log(event)
      }))
      .then(() => Event.insertMany(events))
      .then(() => {
        console.log("Done!");
        mongoose.disconnect();
      })
      .catch(err => {
        console.error(err.stack);
        process.exit(1);
      });
}