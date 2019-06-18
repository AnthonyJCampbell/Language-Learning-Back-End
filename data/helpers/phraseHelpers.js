
// >>> Find all phrases where a particular field is NULL
// i.e. pass phrase_esp_gender as params and returns an array with all user-objects where phrase_esp_gender === NULL
// Useful for a admin dashboard

const getPhrases = () => {
  // return await db('phrases')
}

const getXPhrases = (arrayOfIntegers) => {
  // return arrayOfIntegers.map(async int => {
  //   await getPhrase(int)
  // })
}

const getPhrase = (phrase_id) => {
  // return await db('phrases').where(phrase_id)
}

const addPhrase = (phrase) => {
  // await db('phrases').insert(phrase)
  // return getPhrases()
}

const editPhrase = (phrase_id, updates) => {
  // await db('phrases').where({phrase_id}).update(updates)
  // return getPhrase(phrase_id)
}

const deletePhrase = (phrase_id) => {
  // return db('phrases').where({phrase_id}).del()
}

module.exports = {
  getPhrases,
  getXPhrases,
  getPhrase,
  addPhrase,
  editPhrase,
  deletePhrase
}