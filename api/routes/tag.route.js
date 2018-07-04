const express = require('express');
const router = express.Router();
const jwt = require('../jwt');
const tagCtrl = require('../controllers/tag.controller');

router.use( jwt.checkJWT );
router.get('/',　tagCtrl.getTags);

router.get('/:id', tagCtrl.getTagById);

router.post('/', tagCtrl.postTag);

module.exports = router;
