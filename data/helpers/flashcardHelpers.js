const mongodb = require('mongodb'); 
const db = require('../../api/db')

const getFlashcards = () =>  {
  return db.getDb()
  .db()
  .collection("flashcards")
  .find()
}


const getXNumberOfFlashcards = (numberOfFlashcards) => {
  return db.getDb()
  .db()
  .collection("flashcards")
  .aggregate([
    {$sample: {size: mongodb.Decimal128.fromString(numberOfFlashcards)}}
  ])
}

const getRandomFlashcard = () => {
  return db.getDb()
    .db()
    .collection("flashcards")
    .aggregate([{$sample: {size: 1}}])
}

const getFlashcardById = (id) => {
  return db.getDb()
    .db()
    .collection("flashcards")
    .find({_id: new mongodb.ObjectId(id)})
}

const insertOneFlashcard = (newFlashcard) => {
  return db.getDb()
    .db()
    .collection("flashcards")
    .insertOne(newFlashcard)
}

const insertManyFlashcards = (newFlashcards) => {
  return db.getDb()
    .db()
    .collection("flashcards")
    .insertMany(newFlashcards)
}

// const editFlashcard = (id) => {

// }

// const deleteFlashcard = (id) => {

// }

module.exports = {
  getFlashcards,
  getXNumberOfFlashcards,
  getRandomFlashcard,
  getFlashcardById,
  insertOneFlashcard,
  insertManyFlashcards,
  // editFlashcard,
  // deleteFlashcard
}