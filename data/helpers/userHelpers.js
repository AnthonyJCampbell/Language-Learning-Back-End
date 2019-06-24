const mongodb = require('mongodb'); 
const db = require('../../api/db')

const bcrypt = require('bcryptjs');


const getUsers = () => {
  return db.getDb()
    .db()
    .collection("users")
    .find()
}

const getUserById = id => {
  return db.getDb()
    .db()
    .collection("users")
    .find({_id: new mongodb.ObjectId(id)})
    .limit(1)
}

const getUserByName = name => {
  return db.getDb()
    .db()
    .collection("users")
    .find({name: name.toString()})
    .limit(1)
}

const getUserByEmail = email => {
  return db.getDb()
    .db()
    .collection("users")
    .find({email: email.toString()})
    .limit(1)
}

const addUser = newUser => {
  return db.getDb()
    .db()
    .collection("users")
    .insertOne(newUser)
}

const updateName = (id, newName) => {
  return db.getDb()
    .db()
    .collection("users")
    .update(
      {_id: new mongodb.ObjectId(id)},
      {$set: {name: newName}}
    )
}

const updateEmail = (id, newEmail) => {
  return db.getDb()
    .db()
    .collection("users")
    .updateOne(
      {_id: new mongodb.ObjectId(id)},
      {$set: {email: newEmail}}
    )
}


const updatePassword = (id, newPassword) => {
  return db.getDb()
    .db()
    .collection("users")
    .updateOne(
      {_id: new mongodb.ObjectId(id)},
      {$set: {password: newPassword}}
    )
}


const updateUser = (id, updates) => {
  return db.getDb()
    .db()
    .collection("users")
    .updateOne(
      {_id: new mongodb.ObjectId(id)},
      {$set: updates}
    )
}
  
const deleteUser = id => {
  return db.getDb()
    .db()
    .collection("users")
    .deleteOne({_id: new mongodb.ObjectId(id)})
}

module.exports = {
  getUsers,
  getUserById,
  getUserByName,
  getUserByEmail,
  addUser,
  updateUser,
  updateName,
  updateEmail,
  updatePassword,
  deleteUser
}