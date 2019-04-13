const express = require('express');
const server = express();

// Import Routes
// const routes = require('./location');
const userRoutes = require('./../data/routes/userRoutes')

server.use(express.json());

server.get('/', (req, res) => {
  res.status(200).json({ "message": "Server's alive!"})
})

// Routing && prefixing URLs
server.use('/api/users', userRoutes)

module.exports = server;