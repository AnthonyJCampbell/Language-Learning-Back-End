require('dotenv').config();

const server = require('./api/server.js');
const db = require('./api/db');

const port = process.env.PORT || 7000;

db.initDb((err, db) => {
  // err refers to the callback passed in db.js
  if (err) {
    console.log(err);
  } else {
    server.listen(port, () => console.log(
      `\n** Running on port ${port} **\n`
    ));
  }
})