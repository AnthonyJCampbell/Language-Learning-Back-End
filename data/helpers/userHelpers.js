const db = console.log()
const bcrypt = require('bcryptjs');

const getUsers = async => {
  return db('users')
}

const getUser = async filter => {
  return db('users')
    .where({filter})
    .first()
}

const getUserByEmail = email_address => {
  return db('users').where({email_address}).first()
}

const addUser = async newUser => {
  const password = bcrypt.hashSync(newUser.password, 12);
  await db('users').insert({
    ...newUser,
    password
  });
  return await db('users')
    .where({ username: newUser.username })
    .first();
}
  
const updateUser = async (user_id, updates) => {
  if (updates.password) {
    const password = bcrypt.hashSync(updates.password, 12);
    await db('users')
      .where({ user_id })
      .update({ ...updates, password });
    return await getUser(user_id)
  } else {
    await db('users')
      .where({ user_id })
      .update(updates);
    return await getUser(user_id)
  }
}
  
const deleteUser = async user_id => {
  return await db('users')
    .where({user_id})
    .del()
}

module.exports = {
  getUsers,
  getUser,
  getUserByEmail,
  addUser,
  updateUser,
  deleteUser
}