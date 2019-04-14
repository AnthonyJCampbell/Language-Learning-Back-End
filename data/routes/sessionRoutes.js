const express = require('express');
const users = require('./../helpers/sessionHelpers')

const router = express.Router();
router.use(express.json());

const error404 = {
  message: "The requested user doesn't exist"
}

const error500 = {
  message: "Something went wrong when getting your request."
}

module.exports = router;
