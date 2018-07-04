const express = require('express');
const router = express.Router();
const conf = require('../conf');
const authCtrl = require('../controllers/auth.controller');

router.get('/', authCtrl.getAuthBySlack);

module.exports = router;
