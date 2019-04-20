const express = require('express');
const cors = require('cors')
const helmet = require('helmet');

const server = express();

// Import Routes
// const routes = require('./location');
const userRoutes = require('./../data/routes/userRoutes')
const sessionRoutes = require('./../data/routes/sessionRoutes')
const vocabRoutes = require('./../data/routes/vocabRoutes')
const answerRoutes = require('./../data/routes/answerRoutes')

const users = require('../data/helpers/userHelpers');


server.use(helmet())
server.use(express.json());
server.use(cors ())

server.get('/', (req, res) => {
  res.status(200).json({ "message": "Server's alive!"})
})

// LOGIN
server.post('/login', (req, res) => {
  const { password } = req.body
  if (!req.body.username || !req.body.email_address || !password) {
    return res.status(404).json({message: "Please provide either a 'username' or a 'email_address' and a 'password'"})
  }
  // Login with email is the default, since new sign-ups still have automatically-generated usernames
  if (req.body.email_address && req.body.email_address.includes('@') && identifier.includes('.')) {
    // LOGIN WITH EMAIL 
    // getUser(identifier)
    // Evaluate hashed password to provided hashed password
    // If matching, 
      // create newSession
      // set token to LocalStorage
      // res.status(200)
    // If not matching
      // Send back error saying invalid credentials
  } else {
    if (identifier.includes('@') || identifier.includes('.')) {
      // return error saying username has to be made without special characters
    }
    // LOGIN WITH USERNAME
    // getUser(identifier)
    // Evaluate hashed password to provided hashed password
    // If matching, 
      // create newSession
      // set token to LocalStorage
      // res.status(200)
    // If not matching
      // Send back error saying invalid credentials
  }
})

// REGISTER
// Both username, email_address are required to be unique in the DB.
server.post('/register', async (req, res) => {
  const { email_address, password } = req.body;
  const username = `user-${email_address}`
  if (!username || !email_address || !password) {return res.status(404).json({message: "Make sure to pass a 'username', 'email_address', and 'password"})}
  if (!email_address.includes('@') || !email_address.includes('.')) {return res.status(404).json({message: "Make sure to pass a valid email address!"})}
  await users.addUser({"email_address": email_address, "password": password, "username": username})
    .then(data => {
      res.status(200).json(data)
    })
    .catch(() => {
      res.status(500).json({message: "Whoops!"})
    })
  // Hash password
  // const newUser = { username, email, password: hashedPassword}
  // createUser(newUser)
  // 'LOGIN' PROCEDURE
  // create newSession
  // set token to LocalStrorage
  // res.status(201)
  // push to '/' -> Done on client
})

// Routing && prefixing URLs
// server.use('URL', _ROUTES_);
server.use('/api/users', userRoutes)
server.use('/api/sessions', sessionRoutes)
server.use('/api/vocab', vocabRoutes)
server.use('/api/answers', answerRoutes)

module.exports = server;