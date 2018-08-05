const articleModel = require("../models/article.model");
const userModel = require("../models/user.model");
const ObjectId = require('mongoose').Types.ObjectId;


exports.getTimeLineByTeam = async (req, res) => { // {{{
  try{
    const teamId = req.decoded.teamId;
    const limit = parseInt(req.query.limit, 10) || 10;
    const page = parseInt(req.query.page, 10) || 0;
    let resD = await articleModel.find({teamId: ObjectId(teamId), deleted: false})
      .sort('-created')// 降順、最新順ソート
      .skip((page - 1) * limit)
      .limit(limit);
    let user = {};
    let data = []
    for (var i in resD) {
      let bufData = resD[i]._doc;
      if(resD[i].userId in user){
        data.push({...bufData, ...user[bufData.userId]});
      }else{
        let userdata = await userModel.findOne({_id: ObjectId(resD[i].userId), deleted: false});
        user[userdata._id]  = userdata.user;
        data.push({...bufData, ...userdata.user});
      }
    }
    if (!data.length) {throw [404, 'no data']}
    res.json({message: 'success', data: {articles: data}, error: null});
  } catch (e) {
    console.error(e);
    res.status(e[0]||500).json({message: 'failed', data: null, error: ''+(e[1]||e)});
  }
} // }}}