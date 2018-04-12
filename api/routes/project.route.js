const express = require('express');
const router = express.Router();
const conf = require('../conf');
const projectCtrl = require('../controllers/project.controller');

// router.use( common.checkJWT );
router.get('/',　projectCtrl.getProjects);

router.get('/:id', projectCtrl.getProjectById);

router.post('/', projectCtrl.postProject);

module.exports = router;
