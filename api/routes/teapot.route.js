var express = require('express');
var router = express.Router();
var conf = require('../conf');
const teaCtrl = require('../controllers/teapot.controller');


//router.route('/')
//  .post(common.validate(teaValid.gettea), teaCtrl.root);

router.get('/', teaCtrl.root);

router.post('/nyan', teaCtrl.nyan);


module.exports = router;
