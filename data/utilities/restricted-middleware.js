const bcypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Users = require('./models')

module.exports = (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    jwt.verify(token, process.env.SECRET, (error, decodedToken) => {
      if (error) {
        res.status(401).json({ message: "Not authorized"})
      } else {
        // Make the decoded token available to the endpoint on the req object
        // next
        req.decodedToken = decodedToken
        next();
      }
    })
  } else {
    res.status(400).json({message: "You shall not pass!"})
  }
}