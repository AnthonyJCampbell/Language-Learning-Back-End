const express = require('express');
const phrases = require('../helpers/phraseHelpers')

const router = express.Router();
router.use(express.json());

const error404 = {
  message: "The requested phrase doesn't exist"
}

const error500 = {
  message: "Something went wrong when getting your request."
}

router.get('/', (req, res) => {
  phrases.getPhrases()
    .then(data => {
      res.status(200).json(data)
    })
    .catch(()=> {
      res.status(500).json(error500)
    })
})

router.get('/:phrase_id', (req, res) => {
  const { phrase_id } = req.params;
  phrases.getPhrase(phrase_id)
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

// RETURNS ID of new entry
router.post('/', (req, res) => {
  const user = req.body;
  if (!user) {
    res.status(404).json(error404)
  } else {
    phrases.addPhrase(user)
      .then(data => {
        res.status(201).json(data)
      })
      .catch(() => {
        res.status(500).json(error500)
      })
  }
})

// Returns empty
router.delete('/:filter', (req, res) => {
  const { filter } = req.params;
  phrases.deletePhrase(filter)
    .then(data => {
      if (!data) {
        res.status(404).json(error404)
      } else {
        return res.status(200).json({
          message: `Successfully deleted phrase`
        })
      }
    })
    .catch(() => {
      res.status(500).json(error500)
    })
})

module.exports = router;
