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
      return res.status(200).json(flashcardArray)
    })
    .catch(()=> {
      return res.status(500).json(error500)
    })
})

// getXNumberOfFlashcards
router.get('/random/:number', (req, res) => {
  const numberOfFlashcards = req.params.number;
  const flashcardArray = []
  console.log(numberOfFlashcards)
  db.getDb()
    .db()
    .collection("flashcards")
    .aggregate([
      {$sample: {size: mongodb.Decimal128.fromString(numberOfFlashcards)}}
    ])
    .forEach(card => {
      flashcardArray.push(card);
    })
    .then(() => {
      if(flashcardArray.length < 1) {
        return res.status(404).json({
          message: "There was an error that returned 0 documents. Are you sure you're looking in the right collection?"
        })
      } else {
        return res.status(200).json(flashcardArray);
      }
    })
    .catch(error => {
      return res.status(500).json(error)
    })
})

// getRandomFlashcard
router.get('/random', (req, res) => {
  const flashcardArray = []
  db.getDb()
    .db()
    .collection("flashcards")
    .aggregate([{$sample: {size: 1}}])
    .forEach(card => {
      flashcardArray.push(card);
    })
    .then(() => {
      if(flashcardArray.length < 1) {
        return res.status(404).json(error404)
      } else {
        return res.status(200).json(flashcardArray);
      }
    })
    .catch(error => {
      return res.status(500).json(error)
    })
})

// getFlashcardById
router.get('/:id', (req, res) => {
  const { id } = req.params;
  if (id.length !== 24) {
    return res.status(400).json({
      message: "Make sure you're passing a correct _id!"
    })
  }
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
        return res.status(404).json(error404)
      } else {
        return res.status(200).json(flashcardArray);
      }
    })
    .catch(error => {
      return res.status(500).json(error)
    })
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
