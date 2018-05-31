const jwt = require("../jwt");
const conf = require("../conf");
const articleModel = require("../models/article.model");
const ObjectId = require("mongoose").Types.ObjectId;


exports.getArticles = async (req, res) => {
  try{
    const limit = parseInt(req.query.limit, 10);
    const page = parseInt(req.query.page, 10);
    const data = await articleModel.find({})
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
    const articleId = req.params.id;
    const data = await articleModel.findOne({_id: ObjectId(articleId)});
    if (!data) {throw [404, 'no articles']}
    res.json({message: 'success', data: {articles: data}, error: null});
  } catch (e) {
    console.error(e);
    res.status(e[0]||500).json({message: 'failed', data: null, error: ''+(e[1]||e)});
  }
}

exports.postArticle = async (req, res) => {
  try{
    const body = req.body
    if (body.userId) body.userId = ObjectId(body.userId);
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
