const express = require('express');
const router = express.Router();
const common = require('../common');
const conf = require('../conf');
const productCtrl = require('../controllers/product.controller');

// router.use( common.checkJWT );
router.get('/',　productCtrl.getProducts);

router.get('/:id', productCtrl.getProductById);

router.post('/', productCtrl.postProduct);

module.exports = router;
