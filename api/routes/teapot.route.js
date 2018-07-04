var express = require('express');
var router = express.Router();
const teaCtrl = require('../controllers/teapot.controller');


router.get('/', teaCtrl.root);

router.post('/nyan', teaCtrl.nyan);


module.exports = router;
