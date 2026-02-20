const express = require('express');
const router = express.Router();
const authorController = require('../controllers/author.js');

router.get('/:id', authorController.getArticlesByAuthorId);

module.exports = router;