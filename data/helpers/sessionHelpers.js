
const getSessions = () => {
  // return db('sessions')
}

const getSession = (filter) => {
  // return db('sessions').where(filter)
}

const startSession = (user_id) => {
  // return db('sessions').insert(user_id)
}

const endSession = () => {
  // return db('sessions') 
}

module.exports = {
  getSessions,
  getSession,
  startSession,
  endSession
}