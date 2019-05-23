const express = require('express');
const answers = require('./../helpers/answerHelpers')

const router = express.Router();
router.use(express.json());

const error404 = {
  message: "The requested answer doesn't exist"
}

const error500 = {
  message: "Something went wrong when getting your request."
}


router.get('/', (req, res) => {
  answers.getAnswers()
    .then(data => {
      return res.status(200).json(data)
    })
    .catch(()=> {
      return res.status(500).json(error500)
    })
})

router.get('/:answer_id', (req, res) => {
  const { answer_id } = req.params;
  answers.getAnswer(answer_id)
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

router.get('/random/:numberOfAnswers', async(req, res) => {
  const { numberOfAnswers } = req.params;

  answers.getRandomAnswer(numberOfAnswers)
    .then(data => {
      return res.status(200).json(data)
    })
    .catch(error => {
      return res.status(500).json(error500)
    })
})


// RETURNS ID of new entry
router.post('/', (req, res) => {
  const answer = req.body;
  if (!answer) {
    return res.status(404).json(error404)
  } else {
    answers.addAnswer(answer)
      .then(data => {
        return res.status(201).json(data)
      })
      .catch(() => {
        return res.status(500).json(error500)
      })
  }
})

router.put('/:answer_id', (req, res) => {
  const updates = req.body;
  const { answer_id } = req.params;
  if (!updates) {
    return res.status(404).json(error404)
  } else {
    answers.editAnswer(answer_id, updates)
      .then(data => {
        return res.status(200).json(data)
      })
      .catch(() => {
        return res.status(500).json(error500)
      })
  }
})

// Returns empty
router.delete('/:answer_id', (req, res) => {
  const { answer_id } = req.params;
  answers.deleteAnswer(answer_id)
    .then(data => {
      if (!data) {
        return res.status(404).json(error404)
      } else {
        return res.status(200).json({
          message: `Successfully deleted answer`
        })
      }
    })
    .catch(() => {
      return res.status(500).json(error500)
    })
})

module.exports = router;
