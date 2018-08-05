const userModel = require("../models/user.model");
const teamModel = require("../models/team.model");
const ObjectId = require('mongoose').Types.ObjectId;
const jwt = require('../config/jwt');


exports.getUsers = async (req, res) => { // {{{
  try{
    const limit = parseInt(req.query.limit, 10);
    const page = parseInt(req.query.page, 10);
    const data = await userModel.find({deleted: false})
      .sort('-created')// 降順、最新順ソート
      .skip((page - 1) * limit)
      .limit(limit);
    if (!data.length) {throw [404, 'no users']}
    delete data.teamIds
    res.json({message: 'success', data: {users: data}, error: null});
  } catch (e) {
    console.error(e);
    res.status(e[0]||500).json({message: 'failed', data: null, error: ''+(e[1]||e)});
  }
} // }}}

exports.getUserById = async (req, res) => { // {{{
  try{
    const idToken = req.params.id;
    const data = await userModel.findOne({idToken: idToken, deleted: false});
    if (!data) {throw [404, 'no user']}
    res.json({message: 'success', data: {user: data}, error: null});
  } catch (e) {
    console.error(e);
    res.status(e[0]||500).json({message: 'failed', data: null, error: ''+(e[1]||e)});
  }
} // }}}

exports.postUser = async (req, res) => { // {{{
  try{
    const r1 = await userModel.findOne({
      idToken: req.body.idToken,
      teamId: req.body.teamId
    });
    if (r1) {throw [403, 'already exists']}
    const body = req.body;
    const date = new Date().getTime();
    body.teamId = body.teamId;
    body.user.profile = req.body.user.profile || "";
    body.idToken = req.body.idToken;
    body.created = date;
    body.updated = date;
    body.deleted = false;
    const user = new userModel(body);
    const r2 = await user.save();
    if (!r2) {throw [500, 'failed to post']}
    const r3 = await teamModel.findOneAndUpdate(
      {_id: ObjectId(body.teamId), deleted: false},
      {$addToSet: {users: user._id}}
    )
    if (!r3) {throw [500, 'no team']}
    const jwtoken = jwt.signJWT({teamId: body.teamId, userId: user._id});
    const data = {
      userId: user._id,
      jwtoken: jwtoken,
      ...body
    }
    res.json({message: 'success', data: data, error: null});
  } catch (e) {
    console.error(e);
    res.status(e[0]||500).json({message: 'failed', data: null, error: ''+(e[1]||e)});
  }
} // }}}
