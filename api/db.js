const mongodb = require('mongodb');

const MongoClient = mongodb.MongoClient;
const mongoDbUrl = "mongodb+srv://anthony:max@cluster0-sqwbw.mongodb.net/shop?retryWrites=true&w=majority";

let _db; 

const initDb = callback => {
  // Check if the database is initialized
  if (_db) {
    console.log("Database is already initialized!");
    // We return null first because the callback will return an error first. Don't concern yourself with this.
    return callback(null, _db);
  }
  // If it's not initialized, connect to the database.
  MongoClient.connect(mongoDbUrl, { useNewUrlParser: true })
    .then(client => {
      _db = client;
      callback(null, _db)
    })
    .catch(err => {
      callback(err);
    })
}

const getDb = () => {
  if (!_db) {
    throw Error("Database not initialized!");
  }
  return _db;
}

module.exports = {
  initDb,
  getDb,
};
