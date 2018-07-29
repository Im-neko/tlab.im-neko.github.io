const articleModel = require("../models/article.model");
const ObjectId = require("mongoose").Types.ObjectId;


exports.getArticles = async (req, res) => {
  try{
    const teamId = req.decoded.teamId;
    const limit = parseInt(req.query.limit, 10);
    const page = parseInt(req.query.page, 10);
    const data = await articleModel.find({teamId: ObjectId(teamId), deleted: false})
      .sort('-created')// 降順、最新順ソート
      .skip((page - 1) * limit)
      .limit(limit);
    if (!data.length) {throw [404, 'no articles']}
    res.json({message: 'success', data: {articles: data}, error: null});
  } catch (e) {
    console.error(e);
    res.status(e[0]||500).json({message: 'failed', data: null, error: ''+(e[1]||e)});
  }
}

exports.getArticleById = async (req, res) => {
  try{
    const teamId = req.decoded.teamId;
    const articleId = req.params.id;
    const data = await articleModel.findOne({teamId: ObjectId(teamId), _id: ObjectId(articleId), deleted: false});
    if (!data) {throw [404, 'no articles']}
    res.json({message: 'success', data: {article: data}, error: null});
  } catch (e) {
    console.error(e);
    res.status(e[0]||500).json({message: 'failed', data: null, error: ''+(e[1]||e)});
  }
}

exports.postArticle = async (req, res) => {
  try{
    const body = req.body
    if (req.decoded.teamId) body.teamId = ObjectId(req.decoded.teamId);
    if (req.decoded.userId) body.userId = ObjectId(req.decoded.userId);
    if (body.relation) body.relation = body.relation.map((id) => {return ObjectId(id);});
    if (body.tags) body.tags = body.tags.map((id) => {return ObjectId(id);});
    if (body.categories) body.categories = body.categories.map((id) => {return ObjectId(id);});
    const date = new Date().getTime();
    body.created = date;
    body.updated = date;
    body.deleted = false;
    const article = new articleModel(body);
    const result = await article.save();
    if (!result) {throw [500, 'failed to post']}
    res.json({message: 'success', data: null, error: null});
  } catch (e) {
    console.error(e);
    res.status(e[0]||500).json({message: 'failed', data: null, error: ''+(e[1]||e)});
  }
}
