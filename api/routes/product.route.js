const express = require('express');
const router = express.Router();
const jwt = require('../config/jwt');
const productCtrl = require('../controllers/product.controller');

router.use( jwt.checkJWT );
router.get('/',　productCtrl.getProducts);

router.get('/:id', productCtrl.getProductById);

router.post('/', productCtrl.postProduct);

module.exports = router;
