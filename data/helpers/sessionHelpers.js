const db = require('./../dbConfig');

module.exports = {
  getSessions,
  getSession,
  startSession,
  endSession
}

function getSessions() {
  return db('sessions')
}

function getSession(filter) {
  return db('sessions').where(filter)
}

function startSession(session){
  return db('sessions').insert(session)
}

function endSession() {
  return db('sessions') 
}
