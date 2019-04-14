const db = require('./../dbConfig');

module.exports = {
  getAnswers,
  getAnswer,
  addAnswer,
  // editAnswer,
  deleteAnswer
}

function getAnswers() {
  return db('answers')
}

function getAnswer(filter) {
  return db('answers').where(filter)
}

function addAnswer(answer){
  return db('answers').insert(answer)
}

// function editAnswer(answer_id) {
//   return db('answers')
// }

function deleteAnswer(answer_id) {
  return db('answers').where({answer_id}).del()
}