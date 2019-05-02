const express = require('express');
const cors = require('cors')
const helmet = require('helmet');

const server = express();

// Import Routes
// const routes = require('./location');
const loginAndRegistrationRoutes = require('./../data/routes/loginAndRegistrationRoutes')
const userRoutes = require('./../data/routes/userRoutes')
const sessionRoutes = require('./../data/routes/sessionRoutes')
const vocabRoutes = require('./../data/routes/vocabRoutes')
const answerRoutes = require('./../data/routes/answerRoutes')

server.use(helmet())
server.use(express.json());
server.use(cors())

// Routing && prefixing URLs
// server.use('URL', _ROUTES_);
server.use('/api', loginAndRegistrationRoutes)
server.use('/api/users', userRoutes)
server.use('/api/sessions', sessionRoutes)
server.use('/api/vocab', vocabRoutes)
server.use('/api/answers', answerRoutes)

server.get('/', (req, res) => {
  res.status(200).json({ "message": "Server's alive!"})
})

module.exports = server;