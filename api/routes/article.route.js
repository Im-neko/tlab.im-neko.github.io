const express = require('express');
const router = express.Router();
const jwt = require('../config/jwt');
const articleCtrl = require('../controllers/article.controller');


router.use( jwt.checkJWT );
router.get('/',　articleCtrl.getArticles);

router.get('/:id', articleCtrl.getArticleById);

router.post('/', articleCtrl.postArticle);

module.exports = router;
