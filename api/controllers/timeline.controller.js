const articleModel = require("../models/article.model");
const userModel = require("../models/user.model");
const ObjectId = require('mongoose').Types.ObjectId;


exports.getTimeLineByTeam = async (req, res) => { // {{{
  try{
    const limit = parseInt(req.query.limit, 10);
    const page = parseInt(req.query.page, 10);
    let data = await articleModel.find({deleted: false})
      .sort('-created')// 降順、最新順ソート
      .skip((page - 1) * limit)
      .limit(limit);
    let user = {};
    Object.keys(data).forEach(async (key) => {
      if(data[key].userId in user){
        data[key].icon = user._id.icon;
        data[key].author = user._id.display_name;
      }else{
        let userdata = await userModel.findOne({_id: ObjectId(article.userId), deleted: false});
        data[key].icon = userdata.icon;
        data[key].author = userdata.user.display_name;
        user._id  = userdata.user;
      }
    });
    if (!data.length) {throw [404, 'no data']}
    res.json({message: 'success', data: {articles: data}, error: null});
  } catch (e) {
    console.error(e);
    res.status(e[0]||500).json({message: 'failed', data: null, error: ''+(e[1]||e)});
  }
} // }}}