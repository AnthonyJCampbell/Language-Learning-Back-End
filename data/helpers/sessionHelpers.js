const db = require('../utilities/dbConfig');

module.exports = {
  getSessions,
  getSession,
  startSession,
  endSession
}

function getSessions() {
  return db('sessions')
}

function getSession(session_id) {
  return db('sessions').where({session_id})
}

function startSession(user_id){
  return db('sessions').insert(user_id)
}

function endSession() {
  return db('sessions') 
}
