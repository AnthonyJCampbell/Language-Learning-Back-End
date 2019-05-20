const db = require('../utilities/dbConfig');

module.exports = {
  getAnswers,
  getAnswer,
  addAnswer,
  editAnswer,
  deleteAnswer
}

async function getAnswers() {
  return await db('answers')
}

async function getAnswer(answer_id) {
  return await db('answers').where({answer_id}).first()
}

async function addAnswer(answer){
  await db('answers').insert(answer)
  return db('answers').where({ answer_esp: answer.answer_esp})
}

async function editAnswer(answer_id, updates) {
  await db('answers').where({answer_id}).update(updates)
  return await db('answers').where({answer_id}).first();
}

// Returns empty
async function deleteAnswer(answer_id) {
  return await db('answers').where({answer_id}).del()
}