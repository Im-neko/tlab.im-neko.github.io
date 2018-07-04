const express = require('express');
const router = express.Router();
const jwt = require('../jwt');
const teamCtrl = require('../controllers/team.controller');


router.use( jwt.checkJWT );
router.get('/',　teamCtrl.getTeams);

router.get('/:id', teamCtrl.getTeamById);

router.post('/', teamCtrl.postTeam);

module.exports = router;
