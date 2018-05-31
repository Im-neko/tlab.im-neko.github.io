const conf = require('../conf');
const teamModel = require("../models/team.model");
const ObjectId = require('mongoose').Types.ObjectId;


exports.getTeams = async (req, res) => { // {{{
  try{
    const limit = parseInt(req.query.limit, 10);
    const page = parseInt(req.query.page, 10);
    const data = await teamModel.find({deleted: false})
      .sort('-created')// 降順、最新順ソート
      .skip((page - 1) * limit)
      .limit(limit);
    if (!data.length) {throw [404, 'no teams']}
    res.json({message: 'success', data: {teams: data}, error: null});
  } catch (e) {
    console.error(e);
    res.status(e[0]||500).json({message: 'failed', data: null, error: ''+(e[1]||e)});
  }
} // }}}

exports.getTeamById = async (req, res) => { // {{{
  try{
    const idToken = req.params.id;
    const data = await teamModel.findOne({idToken: idToken, deleted: false});
    if (!data) {throw [404, 'no team']}
    res.json({message: 'success', data: {team: data}, error: null});
  } catch (e) {
    console.error(e);
    res.status(e[0]||500).json({message: 'failed', data: null, error: ''+(e[1]||e)});
  }
} // }}}

exports.postTeam = async (req, res) => { // {{{
  try{
    const body = req.body;
    const date = new Date().getTime();
    body.created = date;
    body.updated = date;
    body.deleted = false;
    const Team = new teamModel(body);
    const result = await team.save();
    if (!result) {throw [500, 'failed to post']}
    res.json({message: 'success', data: null, error: null});
  } catch (e) {
    console.error(e);
    res.status(e[0]||500).json({message: 'failed', data: null, error: ''+(e[1]||e)});
  }
} // }}}
