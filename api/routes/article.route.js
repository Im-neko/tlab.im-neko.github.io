const express = require('express');
const router = express.Router();
const common = require('../common');
const conf = require('../conf');
const articleCtrl = require('../controllers/article.controller');

// router.use( common.checkJWT );
router.get('/',　articleCtrl.getArticles);

router.get('/:id', articleCtrl.getArticleById);

router.post('/', articleCtrl.postArticle);

module.exports = router;
