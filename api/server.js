const express = require('express');
const server = express();

// Import Routes
// const routes = require('./location');

server.use(express.json());

server.get('/', (req, res) => {
  res.status(200).json({ "message": "Server's alive!"})
})

// Routing && prefixing URLs
// server.use('/api/dishes', routeName)

module.exports = server;