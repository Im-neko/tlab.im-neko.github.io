const express = require('express');
const router = express.Router();
const common = require('../common');
const conf = require('../conf');
const categoryCtrl = require('../controllers/category.controller');

// router.use( common.checkJWT );
router.get('/',　categoryCtrl.getCategories);

router.get('/:id', categoryCtrl.getCategoryById);

router.post('/', categoryCtrl.postCategory);

module.exports = router;
