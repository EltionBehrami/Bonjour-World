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
    hashedPassword: bcrypt.hashSync('starwars', 10)
  })
)

for (let i = 1; i < NUM_SEED_USERS; i++) {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  users.push(
    new User ({
      username: faker.internet.userName({firstName, lastName}),
      email: faker.internet.email({firstName, lastName}),
      hashedPassword: bcrypt.hashSync(faker.internet.password(), 10)
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
      host: "6564ba77122569fe91a5ef49",
      attendees: ["6563a2bb66f7cd8279c661c0","6564fb5d122569fe91a5ef58","6564cbc8122569fe91a5ef4d"]
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
      .then(() => User.insertMany(users))
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