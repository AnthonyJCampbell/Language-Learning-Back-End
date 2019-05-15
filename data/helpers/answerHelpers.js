const db = require('../utilities/dbConfig');

module.exports = {
  getAnswers,
  getAnswer,
  addAnswer,
  // editAnswer,
  deleteAnswer
}

async function getAnswers() {
  return await db('answers')
}

async function getAnswer(answer_id) {
  return await db('answers').where({answer_id})
}

async function addAnswer(answer){
  await db('answers').insert(answer)
  return getAnswers()
}

// function editAnswer(answer_id) {
//   return db('answers')
// }

// Returns empty
async function deleteAnswer(answer_id) {
  return await db('answers').where({answer_id}).del()
}