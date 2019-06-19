const users = require('./userHelpers')

const login = (username, password) => {
  // Evaluate if username matches one in the db
  // Evaluate if a hashed version of the provided password matches the password returned by the db
  // IF BOTH PASS
  // set token to localStorage
  // create a new session
  // ELSE
    // Return error
  }
  
const register = (email, password) => {
  // make email lowercase
  // Evaluate if email address is already in use for another account
  // IF NOT
  // insert new user
  // set token to localStorage
  // create a new session
  // ELSE
  // Return error, 'email already in use'
}

module.exports = {
  login,
  register
}