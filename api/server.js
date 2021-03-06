const express = require('express');
const cors = require('cors')
const helmet = require('helmet');

const server = express();

server.use(helmet())
server.use(express.json());
server.use(cors())

// Import Routes
// const routes = require('./location');
const loginAndRegistrationRoutes = require('./../data/routes/loginAndRegistrationRoutes')
const userRoutes = require('./../data/routes/userRoutes')
const flashcardRoutes = require('./../data/routes/flashcardRoutes')

// Routing && prefixing URLs
// server.use('URL', _ROUTES_);
server.use('/api', loginAndRegistrationRoutes)
server.use('/api/users', userRoutes)
server.use('/api/flashcards', flashcardRoutes)

server.get('/', (req, res) => {
  res.status(200).json({ "message": "Server's alive!"})
})

module.exports = server;