const express = require('express');
const flashcards = require('./../helpers/flashcardHelpers')

const mongodb = require('mongodb'); 
const db = require('../../api/db')

const router = express.Router();
router.use(express.json());

// getFlashcards
router.get('/', (req, res) => {
  const flashcardArray = []
  db.getDb()
    .db()
    .collection("flashcards")
    .find()
    .forEach(card => {
      flashcardArray.push(card)
    })
    .then(() => {
      res.status(200).json(flashcardArray)
    })
    .catch(()=> {
      res.status(500).json(error500)
    })
})

// getFlashcardById
router.get('/:id', (req, res) => {
  const { id } = req.params;
  const flashcardArray = []
  db.getDb()
    .db()
    .collection("flashcards")
    .find({_id: new mongodb.ObjectId(id)})
    .forEach(card => {
      flashcardArray.push(card)
    })
    .then(() => {
      if(flashcardArray.length < 1) {
        res.status(404).json(error404)
      } else {
        res.status(200).json(flashcardArray);
      }
    })
    .catch(error => {
      res.status(500).json(error)
    })
})

// getXNumberOfFlashcards
router.get('/many/:number', (req, res) => {
  const { numberOfFlashcards } = req.params.number;
  // phrases.getPhrase(phrase_id)
  // .then(data => {
  //   if(!data) {
  //     res.status(404).json(error404)
  //   } else {
  //     res.status(200).json(data);
  //   }
  // })
  // .catch(error => {
  //   res.status(500).json(error)
  // })
})

// InsertOneFlashcard
router.post('/', (req, res) => {
  const flashcard = req.body;
  // if (!flashcard) {
  //   res.status(404).json(error404)
  // } else {
  //   phrases.addPhrase(user)
  //   .then(data => {
  //     res.status(201).json(data)
  //   })
  //   .catch(() => {
  //     res.status(500).json(error500)
  //   })
  // }
})

// InsertManyFlashcards
router.post('/many', (req, res) => {
  const flashcards = req.body;
  // if (!flashcards) {
  //   res.status(404).json(error404)
  // } else {
  //   phrases.addPhrase(user)
  //   .then(data => {
  //     res.status(201).json(data)
  //   })
  //   .catch(() => {
  //     res.status(500).json(error500)
  //   })
  // }
})

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  // phrases.deletePhrase(id)
  // .then(data => {
  //   if (!data) {
  //     res.status(404).json(error404)
  //   } else {
  //     res.status(204).json({
  //       message: `Successfully deleted phrase`
  //     })
  //   }
  // })
  // .catch(() => {
  //   res.status(500).json(error500)
  // })
})

const error404 = {
  message: "The requested flashcard doesn't exist"
}

const error500 = {
  message: "Something went wrong when getting your request."
}

module.exports = router;
