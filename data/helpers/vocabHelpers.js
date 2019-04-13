const db = require('./../dbConfig');

module.exports = {
  getPhrases,
  getPhrase,
  addPhrase,
  editPhrase,
  deletePhrase
}

function getPhrases() {
  return db('answers')
}

function getPhrase(phrase_id) {
  return db('answers').where({phrase_id})
}

function addPhrase(phrase){
  return db('answers').insert(phrase)
}

function editPhrase(phrase_id) {
  return db('answers')
}

function deletePhrase(phrase_id) {
  return db('answers').where({phrase_id}).del()
}