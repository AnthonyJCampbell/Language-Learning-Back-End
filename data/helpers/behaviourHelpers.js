const db = require('./../dbConfig');
const users = require('./userHelpers')

module.exports = {
  login,
  register
}

function login(username, password) {
  // Evaluate if username matches one in the db
  // Evaluate if a hashed version of the provided password matches the password returned by the db
  // IF BOTH PASS
    // set token to localStorage
    // create a new session
  // ELSE
    // Return error
}

function register(email, password) {
  // make email lowercase
  // Evaluate if email address is already in use for another account
  // IF NOT
    // insert new user
    // set token to localStorage
    // create a new session
  // ELSE
    // Return error, 'email already in use'
}