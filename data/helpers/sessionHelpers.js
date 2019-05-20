const db = require('../utilities/dbConfig');

module.exports = {
  getSessions,
  getSessionBySessionId,
  getSessionsByUserId,
  startSession,
  endSession
}

async function getSessions() {
  return await db('sessions')
}

async function getSessionBySessionId(session_id) {
  return await db('sessions').where({session_id})
}

async function getSessionsByUserId(user_id) {
  return await db('sessions').where({user_id})
}

async function startSession(user_id){
  return await db('sessions')
}

async function endSession() {
  return await db('sessions') 
}
