const express = require('express');
const users = require('./../helpers/userHelpers')

const router = express.Router();
router.use(express.json());

const error404 = {
  message: "The requested user doesn't exist"
}

const error500 = {
  message: "Something went wrong when getting your request."
}

router.get('/', (req, res) => {
  users.getUsers()
    .then(data => {
      return res.status(200).json(data)
    })
    .catch(()=> {
      return res.status(500).json(error500)
    })
})

router.get('/:user_id', (req, res) => {
  const { user_id } = req.params;
  users.getUser(user_id)
    .then(data => {
      if(!data) {
        return res.status(404).json(error404)
      } else {
        return res.status(200).json(data);
      }
    })
    .catch(error => {
      return res.status(500).json(error)
    })
})

// RETURNS ID of new entry
router.post('/', (req, res) => {
  const user = req.body;
  if (!user) {
    return res.status(404).json(error404)
  } else {
    users.addUser(user)
      .then(data => {
        return res.status(201).json(data)
      })
      .catch(() => {
        return res.status(500).json(error500)
      })
  }
})

router.put('/:user_id', (req, res) => {
  const { user_id } = req.params;
  const updates = req.body;
  if (!updates.username && !updates.email_address && !updates.password) {
    return res.status(404).json({
      message: `Hey! Make sure to pass either a 'username', 'email_address', or 'password' if you want to change it!`
    })
  } else {
    users.updateUser(user_id, updates)
    .then(user => {
      return res.status(200).json(user);
    })
    .catch(() => {
      return res.status(500).json(error500);
    });
  }
})

// Returns empty
router.delete('/:filter', (req, res) => {
  const { filter } = req.params;
  users.deleteUser(filter)
    .then(data => {
      if (!data) {
        return res.status(404).json(error404)
      } else {
        return res.status(204).json({
          message: `Successfully deleted user`
        })
      }
    })
    .catch(() => {
      return res.status(500).json(error500)
    })
})

module.exports = router;
