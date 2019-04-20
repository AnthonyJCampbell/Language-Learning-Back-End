const db = require('../utilities/dbConfig');

module.exports = {
  getUsers,
  getUser,
  addUser,
  // editUser,
  deleteUser
}

function getUsers() {
  return db('users')
}

function getUser(filter) {
  return db('users').where({filter})
}

function addUser(newUser){
  return db('users').insert(newUser)
}

// function editUser(user_id) {
//   return db('users')
// }

function deleteUser(user_id) {
  return db('users').where({user_id}).del()
}