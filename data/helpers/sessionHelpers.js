const db = console.log()

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

function startSession(user_id){
  return db('sessions').insert(user_id)
}

function endSession() {
  return db('sessions') 
}
