const express = require('express');
const router = express.Router();
const jwt = require('../config/jwt');
const categoryCtrl = require('../controllers/category.controller');

router.use( jwt.checkJWT );
router.get('/',　categoryCtrl.getCategories);

router.get('/:id', categoryCtrl.getCategoryById);

router.post('/', categoryCtrl.postCategory);

module.exports = router;
