const conf = require('../conf');
const userModel = require("../models/user.model");
const teamModel = require("../models/team.model");
const ObjectId = require('mongoose').Types.ObjectId;


exports.getTimeLineByTeam = async (req, res) => { // {{{
  try{
    const limit = parseInt(req.query.limit, 10);
    const page = parseInt(req.query.page, 10);
    let data = await userModel.find({deleted: false})
      .sort('-created')// 降順、最新順ソート
      .skip((page - 1) * limit)
      .limit(limit);
    if (!data.length) {throw [404, 'no users']}
    data = data.map(user => user.user)
    res.json({message: 'success', data: {users: data}, error: null});
  } catch (e) {
    console.error(e);
    res.status(e[0]||500).json({message: 'failed', data: null, error: ''+(e[1]||e)});
  }
} // }}}