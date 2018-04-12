const express = require('express');
const router = express.Router();
const conf = require('../conf');
const tagCtrl = require('../controllers/tag.controller');

// router.use( common.checkJWT );
router.get('/',　tagCtrl.getTags);

router.get('/:id', tagCtrl.getTagById);

router.post('/', tagCtrl.postTag);

module.exports = router;
