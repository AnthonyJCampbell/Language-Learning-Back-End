const express = require('express');
const users = require('./../helpers/userHelpers')

const router = express.Router();
router.use(express.json());

const mongodb = require('mongodb'); 
const db = require('../../api/db')

const bcrypt = require('bcryptjs');


router.get('/', (req, res) => {
  const userArray = []
  db.getDb()
    .db()
    .collection("users")
    .find()
    .forEach(user => {
      userArray.push(user)
    })
    .then(() => {
      res.status(200).json(userArray)
    })
    .catch(()=> {
      res.status(500).json(error500)
    })
})

// Find user by id.

// Find user by username
router.get('/:username', (req, res) => {
  const username = req.params.username.toLowerCase()
  const userArray = []
  db.getDb()
    .db()
    .collection("users")
    .find({name: username})
    .limit(1)
    .forEach(user => {
      userArray.push(user)
    })
    .then(() => {
      console.log(userArray)
      if(userArray.length < 1) {
        res.status(404).json(error404)
      } else {
        res.status(200).json(userArray);
      }
    })
    .catch(error => {
      res.status(500).json(error)
    })
})

// RETURNS ID of new entry
router.post('/', (req, res) => {
  let { name, email, password } = req.body;
  
  if (!name || !email || !password) {
    return res.status(400).json({
      message: "Make sure to provide a name, email, and password!"
    })
  }

  if (!email.includes('@') || !email.includes('.') || email.length < 10) {
    return res.status(400).json({
      message: "Make sure to pass a valid email address!"
    })
  }
  // Disabled during development
  if (password.length < 8 || password == password.toLowerCase()) {
    console.log(password.length)
    return res.status(400).json({
      message: "Make sure your password is at least 8 characters long and contains at least one uppercase letter!"
    })
  }

  password = bcrypt.hashSync(password, 12)
  const newUser = {
    name: name.toLowerCase(),
    email: email.toLowerCase(),
    password: password
  }
  db.getDb()
    .db()
    .collection("users")
    .insertOne(newUser)
    .then(() => {
      // Output of newUser includes "_id"
      return res.status(201).json({
        message: "Success!",
        user: newUser
      })
    })
    .catch(() => {
      return res.status(500).json(error500)
    })
})

router.put('/:user_id', (req, res) => {
  const { user_id } = req.params;
  const updates = req.body;
  if (!updates.username && !update.email_address && !updates.password) {
    res.status(404).json({
      message: `Hey! Make sure to pass either a 'username', 'email_address', or 'password' if you want to change it!`
    })
  } else {
    users.updateUser(user_id, updates)
    .then(user => {
      res.status(200).json(user);
    })
    .catch(() => {
      res.status(500).json(error500);
    });
  }
})

// Returns empty
router.delete('/:filter', (req, res) => {
  const { filter } = req.params;
  users.deleteUser(filter)
  .then(data => {
    if (!data) {
      res.status(404).json(error404)
    } else {
      res.status(204).json({
        message: `Successfully deleted user`
        })
      }
    })
    .catch(() => {
      res.status(500).json(error500)
    })
})

module.exports = router;

const error404 = {
  message: "The requested user doesn't exist"
}

const error500 = {
  message: "Something went wrong when getting your request."
}