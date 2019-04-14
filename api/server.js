const express = require('express');
const server = express();

// Import Routes
// const routes = require('./location');
const userRoutes = require('./../data/routes/userRoutes')
const sessionRoutes = require('./../data/routes/sessionRoutes')
const vocabRoutes = require('./../data/routes/vocabRoutes')
const answerRoutes = require('./../data/routes/answerRoutes')

server.use(express.json());

server.get('/', (req, res) => {
  res.status(200).json({ "message": "Server's alive!"})
})

// LOGIN
server.post('/login', (req, res) => {
  const { identifier, password } = req.body
  if (!identifier || !password) {
    return res.status(404).json({message: "GET ME A DAMN IDENTIFIER AND PASSWORD!"})
  }
  if (identifier.includes('@') && identifier.includes('.')) {
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
server.post('/register', (req, res) => {
  const { email, password } = req.body;
  if (!email || ! password) {
    return res.status(404).json({message: "GET ME A DAMN IDENTIFIER AND PASSWORD!"})
  }
  if (!email.includes('@') || !email.includes('.')) {
    // return error saying you need to pass a valid email address
  }
  // On first sign-up, username is set to email. User can later change it to whatever he desires.
  const username = email;
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