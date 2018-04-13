const conf = require("../conf");
const articleModel = require("../models/article.model");
const ObjectId = require("mongoose").Types.ObjectId;


exports.getArticles = async (req, res) => { // {{{
  let lang = req.query.lang || "ja";
  articleModel.find({}, async (err, result) => {
    if (err) {res.status(500).json({"error": "InternalServerError"}); return;}
    if (result.length) {
      res.json({"articles": result});
    } else {
      console.error(result);
      res.status(404).json({"error":"article not found"});
    }
  }).catch(err => {
    console.error(err);
    res.status(500).json({"error": "DBError"});
  });
} // }}}

exports.getArticleById = async (req, res) => { // {{{
  let lang = req.query.lang || "all";
  let articleId = req.params.id;
  console.log(articleId);
  articleModel.findOne({_id: ObjectId(articleId)}, async (err, result) => {
    if (err) {res.status(500).json({"error": "InternalServerError"}); return;}
    if (result) {
      console.log(result);
      res.json({"article": result});
    } else {
      console.error(result);
      res.status(404).json({"error":"article not found"});
    }
  }).catch(err => {
    console.error(err);
    res.status(500).json({"error": "DBError"});
  });
} // }}}

exports.postArticle = async (req, res) => { // {{{
    let body = req.body
    if (body.userId) body.userId = ObjectId(body.userId);
    if (body.relation) body.relation = body.relation.map((id) => {return ObjectId(id);});
    if (body.countries) body.countries = body.countries.map((id) => {return ObjectId(id);});
    if (body.tags) body.tags = body.tags.map((id) => {return ObjectId(id);});
    if (body.categories) body.categories = body.categories.map((id) => {return ObjectId(id);});
    const date = new Date().getTime();
    body.createdAt = date;
    body.updatedAt = date;
    const article = new articleModel(body);
    let result = await article.save((err, result) => {
        if (err) {
            console.error(err);
            res.status(500).json({"error": "cannot create"});
            return;
        }

        if (result){
          console.log(result);
          res.json({"message": result})
        } else {
            console.error(result)
            res.status(400).json({"error": "cannot create"});
        }
    });
} // }}}
