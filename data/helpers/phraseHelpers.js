const db = require('../utilities/dbConfig');

module.exports = {
  getPhrases,
  getPhrase,
  addPhrase,
  // editPhrase,
  deletePhrase
}

// To-do
// >>> Get X random phrases.
// Takes in an array of ints as parameter.
// Returns an array with phrases with phrase_ids matching to the ints passed in the param array

function getPhrases() {
  return db('phrases')
}

function getPhrase(phrase_id) {
  return db('phrases').where(filter)
}

function addPhrase(phrase){
  return db('phrases').insert(phrase)
}

// function editPhrase(phrase_id) {
//   return db('phrases')
// }

function deletePhrase(phrase_id) {
  return db('phrases').where({phrase_id}).del()
}