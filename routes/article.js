const express = require('express');
const router = express.Router();
const articleController = require('../controllers/article.js');
const articleAdminController = require('../controllers/admin/article.js');

router.get('/', articleController.getAllArticles);
router.get('/article/:slug', articleController.getArticleBySlug);

router.post('/admin/article/create', articleAdminController.createArticle);
router.get('/admin/article/edit/:id', articleAdminController.getArticle);
router.patch('/admin/article/edit/:id', articleAdminController.editArticle);

module.exports = router;