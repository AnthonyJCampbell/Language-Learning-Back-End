const express = require('express');
const users = require('./../helpers/userHelpers')

const router = express.Router();
router.use(express.json());

const mongodb = require('mongodb'); 
const db = require('../../api/db')

const bcrypt = require('bcryptjs');


router.get('/', (req, res) => {
  const userArray = []
  users.getUsers()
    .forEach(user => {
      userArray.push(user)
    })
    .then(() => {
      return res.status(200).json(userArray)
    })
    .catch(()=> {
      return res.status(500).json(error500)
    })
})

// Find user by id.
router.get('/:id', (req, res) => {
  const { id } = req.params
  const userArray = []
  users.getUserById(id)
    .forEach(user => {
      userArray.push(user)
    })
    .then(() => {
      if(userArray.length < 1) {
        return res.status(404).json(error404)
      } else {
        res.status(200).json(userArray);
      }
    })
    .catch(error => {
      return res.status(500).json(error)
    })
})

// Find user by name
router.get('/n/:name', (req, res) => {
  const name = req.params.name.toLowerCase()
  const userArray = []
  users.getUserByName(name)
    .forEach(user => {
      userArray.push(user)
    })
    .then(() => {
      if(userArray.length < 1) {
        return res.status(404).json(error404)
      } else {
        return res.status(200).json(userArray);
      }
    })
    .catch(error => {
      return res.status(500).json(error)
    })
})

// addUser
router.post('/', (req, res) => {
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
    password: password
  }
  users.addUser(newUser)
    .then(() => {
      // Output of newUser includes "_id"
      return res.status(201).json({
        message: "Success!",
        user: newUser
      })
    })
    .catch(() => {
      return res.status(500).json(error500)
    })
})

// Change password
router.put('/p/:id', (req, res) => {
  // Requires name and email. PASSWORD WILL BE ADDED IN A BIT
  const { id } = req.params;
  const userArray = []

  const newPassword = bcrypt.hashSync(req.body.password, 12);
  
  if (!newPassword) {
    return res.status(404).json({
      message: `Make sure to pass a password`
    })
  } else {
    users.updatePassword(id, newPassword)
    .then(() => {
      users.getUserById(id)
      .forEach(user => {
        userArray.push(user)
      })
      .then(() => {
        return res.status(200).json(userArray);
      })
    })
    .catch(() => {
      return res.status(500).json(error500);
    });
  }
})

// Change user name and email
router.put('/:id', (req, res) => {
  // Requires name and email. PASSWORD WILL BE ADDED IN A BIT
  const { id } = req.params;
  const userArray = []

  if (!req.body.name && !req.body.email) {
    return res.status(404).json({
      message: `Hey! Make sure to pass either a name or email if you want to change it!`
    })
  } 

  if (!req.body.email) {
    users.updateName(id, req.body.name)
    .then(() => {
      users.getUserById(id)
      .forEach(user => {
        userArray.push(user)
      })
      .then(() => {
        return res.status(200).json(userArray);
      })
    })
    .catch(() => {
      return res.status(500).json(error500);
    });
  } 
  
  else {
    users.updateEmail(id, req.body.email)
    .then(() => {
      users.getUserById(id)
      .forEach(user => {
        userArray.push(user)
      })
      .then(() => {
        return res.status(200).json(userArray);
      })
    })
    .catch(() => {
      return res.status(500).json(error500);
    });
  }
})

// Returns empty
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  users.deleteUser(id)
  .then(data => {
    if (!data) {
      return res.status(400).json(error404)
    } else {
      return res.status(204).json({
        message: "Successfully deleted user"
        })
      }
    })
    .catch(() => {
      res.status(500).json(error500)
    })
})

module.exports = router;

const error404 = {
  message: "The requested user doesn't exist"
}

const error500 = {
  message: "Something went wrong when getting your request."
}