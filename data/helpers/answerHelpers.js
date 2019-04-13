const db = require('./../dbConfig');

module.exports = {
  getAnswers,
  getAnswer,
  addAnswer,
  editAnswer,
  deleteAnswer
}

function getAnswers() {
  return db('answers')
}

function getAnswer(answer_id) {
  return db('answers').where({answer_id})
}

function addAnswer(answer){
  return db('answers').insert(answer)
}

function editAnswer(answer_id) {
  return db('answers')
}

function deleteAnswer(id) {
  return db('answers').where({id}).del()
}