const db = console.log()

module.exports = {
  getPhrases,
  getXPhrases,
  getPhrase,
  addPhrase,
  editPhrase,
  deletePhrase
}

// >>> Find all phrases where a particular field is NULL
// i.e. pass phrase_esp_gender as params and returns an array with all user-objects where phrase_esp_gender === NULL
// Useful for a admin dashboard

async function getPhrases() {
  return await db('phrases')
}

async function getXPhrases(arrayOfIntegers) {
  return arrayOfIntegers.map(async int => {
    await getPhrase(int)
  })
}

async function getPhrase(phrase_id) {
  return await db('phrases').where(phrase_id)
}


async function addPhrase(phrase){
  await db('phrases').insert(phrase)
  return getPhrases()
}

async function editPhrase(phrase_id, updates) {
  await db('phrases').where({phrase_id}).update(updates)
  return getPhrase(phrase_id)
}

async function deletePhrase(phrase_id) {
  return db('phrases').where({phrase_id}).del()
}