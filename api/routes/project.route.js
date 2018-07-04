const express = require('express');
const router = express.Router();
const jwt = require('../jwt');
const projectCtrl = require('../controllers/project.controller');

router.use( jwt.checkJWT );
router.get('/',　projectCtrl.getProjects);

router.get('/:id', projectCtrl.getProjectById);

router.post('/', projectCtrl.postProject);

module.exports = router;
