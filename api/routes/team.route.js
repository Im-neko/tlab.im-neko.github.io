const express = require('express');
const router = express.Router();
const conf = require('../conf');
const teamCtrl = require('../controllers/team.controller');

// router.use( common.checkJWT );
//router.get('/',　teamCtrl.getTeams);

router.get('/:id', teamCtrl.getTeamById);

router.post('/', teamCtrl.postTeam);

module.exports = router;
