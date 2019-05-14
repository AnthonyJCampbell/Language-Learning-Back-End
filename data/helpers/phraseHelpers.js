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
// 
// >>> Find all phrases where a particular field is NULL
// i.e. pass phrase_esp_gender as params and returns an array with all user-objects where phrase_esp_gender === NULL
// Useful for a admin dashboard


async function getPhrases() {
  return await db('phrases')
}

async function getPhrase(phrase_id) {
  return await db('phrases').where(phrase_id)
}

async function addPhrase(phrase){
  await db('phrases').insert(phrase)
  return getPhrases()
}

// async function editPhrase(phrase_id) {
//   return db('phrases')
// }

async function deletePhrase(phrase_id) {
  return db('phrases').where({phrase_id}).del()
}