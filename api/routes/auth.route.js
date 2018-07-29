const express = require('express');
const router = express.Router();
const authCtrl = require('../controllers/auth.controller');

router.get('/', authCtrl.getAuthBySlack);

module.exports = router;
