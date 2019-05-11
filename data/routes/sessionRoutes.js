const express = require('express');
const sessions = require('./../helpers/sessionHelpers')

const router = express.Router();
router.use(express.json());

const error404 = {
  message: "The requested session doesn't exist"
}

const error500 = {
  message: "Something went wrong when getting your request."
}

router.get('/', (req, res) => {
  sessions.getSessions()
    .then(data => {
      res.status(200).json(data)
    })
    .catch(()=> {
      res.status(500).json(error500)
    })
})

router.get('/:filter', (req, res) => {
  const { filter } = req.params;
  sessions.getSession(filter)
    .then(data => {
      if(!data) {
        res.status(404).json(error404)
      } else {
        res.status(200).json(data);
      }
    })
    .catch(error => {
      res.status(500).json(error)
    })
})

// RETURNS ID of new session
// Start session
router.post('/start', (req, res) => {
  const user_id = req.body;
  if (!user) {
    res.status(404).json(error404)
  } else {
    sessions.startSession(user_id)
      .then(data => {
        res.status(201).json(data)
      })
      .catch(() => {
        res.status(500).json(error500)
      })
  }
})

// End session
router.post('/end', (req, res) => {
  const user_id = req.body;
  // Get latest session from user
  // i.e. getSession(user_id).last()
  // const end_of_session = now()
  // const length_of_session = end_of_session - start_of_session
  // sessions.endSession(user_id, length_of_session, end_of_session)
    // .then(data => {
    //   res.status(201).json(data)
    // })
    // .catch(() => {
    //   res.status(500).json(error500)
    // })
})


module.exports = router;
