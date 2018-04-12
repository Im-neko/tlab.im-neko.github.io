const express = require('express');
const router = express.Router();
const conf = require('../conf');
const userCtrl = require('../controllers/user.controller');

// router.use( common.checkJWT );
router.get('/',　userCtrl.getUsers);

router.get('/:id', userCtrl.getUserById);

router.post('/', userCtrl.postUser);

module.exports = router;
