const express = require('express')
const router = express.Router()
const GenAIController = require('../controllers/GenerativeAI')

router.post('/generate', GenAIController.sendQuery)

module.exports = router