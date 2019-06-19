const express = require('express');
const tokenService = require('../utilities/token-generator');
const bcrypt = require('bcryptjs');

const router = express.Router();
router.use(express.json());

const db = require('../../api/db')

const users = require('../helpers/userHelpers');

// LOGIN
router.post('/login', (req, res) => {
  const password = req.body.password
  const email_address = req.body.email_address;
  // const username = req.body.email_address;
  
  if ((!req.body.username && !req.body.email_address) || !req.body.password) {
    return res.status(404).json({message: "Please provide either a 'username' or a 'email_address' and a 'password'"})
  }
  
  // Login with email is the default, since new sign-ups still have automatically-generated usernames
  if (email_address.includes('@') && email_address.includes('.')) {
    users.getUserByEmail(email_address)
      .then(user => {
      // SUCCESS CASE: CORRECT USERNAME & PASSWORD.
        if (user && bcrypt.compareSync(password, user.password)) {
          const token = tokenService(user);
          // RETURNS A MESSAGE, A TOKEN, AND THE USER OBJECT
          return res.status(200).json({
            token,
            user
          });
        }
        // FAIL: INCORRECT PASSWORD
        if (user && !bcrypt.compareSync(password, user.password)) {
          return res.status(404).json({ 
            message: 'Invalid password!' 
          });
        }
        // FAIL: INCORRECT USERNAME (DEFAULT)
        else {
          return res.status(404).json({
            message: `There's no user with an 'email_address' of ${req.body.email_address}`
          });
        }
      })
      .catch(() => {
        return res.status(500).json({ 
          message: "Something's gone wrong!"
        })
      })

  } else {
    // Login with Username
    users.getUser(username)
      .then(user => {
        // SUCCESS CASE: CORRECT USERNAME & PASSWORD.
        if (user && bcrypt.compareSync(password, user.password)) {
          const token = tokenService(user);
          // RETURNS A MESSAGE, A TOKEN, AND THE USER OBJECT
          return res.status(200).json({
            token,
            user
          });
        }
        // FAIL: INCORRECT PASSWORD
        if (user && !bcrypt.compareSync(password, user.password)) {
          return res.status(404).json({ 
            message: 'Invalid password!' 
          });
        }
        // FAIL: INCORRECT USERNAME (DEFAULT)
        else {
          return res.status(404).json({
            message: `There's no user with an 'username' of ${req.body.username}`
          });
        }
      })
      .catch(() => {
        return res.status(500).json({ 
          message: "Something's gone wrong!"
        })
      })
  }
})

// REGISTER
// Both username, email_address are required to be unique in the DB.
// Returns a token and a user object
router.post('/register', (req, res) => {
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
  // if (password.length < 8 || password == password.toLowerCase()) {
  //   console.log(password.length)
  //   return res.status(400).json({
  //     message: "Make sure your password is at least 8 characters long and contains at least one uppercase letter!"
  //   })
  // }

  password = bcrypt.hashSync(password, 12)
  const newUser = {
    name: name.toLowerCase(),
    email: email.toLowerCase(),
    password: password.toString()
  }

  db.getDb()
    .db()
    .collection("users")
    .insertOne(newUser)
    .then(user => {
      const token = tokenService(user);
      // Output of newUser includes "_id"
      return res.status(201).json({
        message: "Success!",
        token,
        user: newUser
      })
    })
    .catch(() => {
      return res.status(500).json(error500)
    })
})

module.exports = router;