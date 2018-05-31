const conf = require('../conf');
const userModel = require("../models/user.model");
const ObjectId = require('mongoose').Types.ObjectId;


exports.getUsers = async (req, res) => { // {{{
  try{
    const limit = parseInt(req.query.limit, 10);
    const page = parseInt(req.query.page, 10);
    const data = await userModel.find({deleted: false})
      .sort('-created')// 降順、最新順ソート
      .skip((page - 1) * limit)
      .limit(limit);
    if (!data.length) {throw [404, 'no users']}
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
    const body = req.body;
    const date = new Date().getTime();
    body.created = date;
    body.updated = date;
    body.deleted = false;
    const User = new userModel(body);
    const result = await user.save();
    if (!result) {throw [500, 'failed to post']}
    res.json({message: 'success', data: null, error: null});
  } catch (e) {
    console.error(e);
    res.status(e[0]||500).json({message: 'failed', data: null, error: ''+(e[1]||e)});
  }
} // }}}
