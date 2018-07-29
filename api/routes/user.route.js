const express = require('express');
const router = express.Router();
const jwt = require('../config/jwt');
const userCtrl = require('../controllers/user.controller');

router.use( jwt.checkJWT );
router.get('/',　userCtrl.getUsers);

router.get('/:id', userCtrl.getUserById);

router.post('/', userCtrl.postUser);

module.exports = router;
