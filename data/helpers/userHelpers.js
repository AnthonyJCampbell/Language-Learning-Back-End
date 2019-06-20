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

const addUser = newUser => {
  return db.getDb()
    .db()
    .collection("users")
    .insertOne(newUser)
}
  
// const updateUser = (user_id, updates) => {
//   if (updates.password) {
//     const password = bcrypt.hashSync(updates.password, 12);
//     // await db('users')
//     //   .where({ user_id })
//     //   .update({ ...updates, password });
//     // return await getUser(user_id)
//   } else {
//     // await db('users')
//     //   .where({ user_id })
//     //   .update(updates);
//     // return await getUser(user_id)
//   }
// }
  
// const deleteUser = user_id => {
//   // return await db('users')
//   //   .where({user_id})
//   //   .del()
// }

module.exports = {
  getUsers,
  getUserById,
  getUserByName,
  addUser,
  // updateUser,
  // deleteUser
}