const express = require('express');
const server = express();

// Import Routes
// const routes = require('./location');

server.use(express.json());

// Routing && prefixing URLs
// server.use('/api/dishes', routeName)

module.exports = server;