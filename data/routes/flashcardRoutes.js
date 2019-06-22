const express = require('express');
const flashcards = require('./../helpers/flashcardHelpers')

const mongodb = require('mongodb'); 
const db = require('../../api/db')

const router = express.Router();
router.use(express.json());

// getFlashcards
router.get('/', (req, res) => {
  const flashcardArray = []
  flashcards.getFlashcards()
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
  flashcards.getXNumberOfFlashcards(numberOfFlashcards)
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
  flashcards.getRandomFlashcard()
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
  flashcards.getFlashcardById(id)
    .forEach(card => {
      console.log(card)
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
  const { englishPhrase, spanishPhrase, keywords} = req.body
  if (!englishPhrase || !spanishPhrase || !keywords) {
    return res.status(400).json({
      message: "Make sure your request is complete!"
    })
  }
  const newFlashcard = {
    englishPhrase: englishPhrase,
    spanishPhrase: spanishPhrase,
    keywords: keywords
  }
  flashcards.insertOneFlashcard(newFlashcard)
    .then(() => {
      // Output of newFlashcard includes "_id"
      return res.status(201).json({
        message: "Success!",
        flashcard: newFlashcard
      })
    })
    .catch(() => {
      return res.status(500).json(error500)
    })
})

// InsertManyFlashcards
router.post('/many', (req, res) => {
  const flashcardsArray = req.body;
  const newFlashcards = []

  flashcardsArray.forEach((card, idx) => {
    // if (!card.englishPhrase || !card.spanishPhrase || !card.keywords) {
    //   return res.status(400).json({message: `Something is wrong with entry no. ${idx + 1}`})
    // }

    newFlashcards.push({
      englishPhrase: card.englishPhrase,
      spanishPhrase: card.spanishPhrase,
      keywords: {...card.keywords},
    })
  })

  flashcards.insertManyFlashcards(newFlashcards)
    .then(() => {
      // Output of newFlashCards includes "_id"
      return res.status(201).json({
        message: "Success!",
        flashcards: newFlashcards
      })
    })
    .catch(() => {
      return res.status(500).json(error500)
    })
})

// editFlashcard
// router.put('/:id', (req, res) => {
//   const { id } = req.params;

// })

// // deleteFlashcard
// router.delete('/:id', (req, res) => {
//   const { id } = req.params;
  
// })

const error404 = {
  message: "The requested flashcard doesn't exist"
}

const error500 = {
  message: "Something went wrong when getting your request."
}

module.exports = router;
