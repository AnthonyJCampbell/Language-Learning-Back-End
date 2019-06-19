const mongodb = require('mongodb'); 

const getAnswers = () =>  {
  // return await db('answers')
}

const getAnswer = (answer_id) => {
  // return await db('answers').where({answer_id}).first()
}

const addAnswer = (answer) => {
  // await db('answers').insert(answer, 'answer_id')
  // return await db('answers').where({ answer_id })
}

const editAnswer = (answer_id) => {
  // return db('answers')
}

// Returns empty
const deleteAnswer = (answer_id) => {
  // return await db('answers').where({answer_id}).del()
}

module.exports = {
  getAnswers,
  getAnswer,
  addAnswer,
  editAnswer,
  deleteAnswer
}
