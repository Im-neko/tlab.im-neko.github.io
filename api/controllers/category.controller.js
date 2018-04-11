const common = require("../common");
const conf = require("../conf");
const categoryModel = require("../models/category.model");
const ObjectId = require("mongoose").Types.ObjectId;


exports.getCategories = async (req, res) => {
  let lang = req.query.lang || "ja";
  categoryModel.find({}, async (err, result) => {
    if (err) {res.status(500).json({"error": "InternalServerError"}); return;}
    if (result.length) {
      res.json({"categories": result});
    } else {
      console.error(result);
      res.status(404).json({"error":"category not found"});
    }
  }).catch(err => {
    console.error(err);
    res.status(500).json({"error": "DBError"});
  });
}

exports.getCategoryById = async (req, res) => {
  let lang = req.query.lang || "all";
  let categoryId = req.params.id;
  console.log(categoryId);
  categoryModel.findOne({_id: ObjectId(categoryId)}, async (err, result) => {
    if (err) {res.status(500).json({"error": "InternalServerError"}); return;}
    if (result) {
      console.log(result);
      res.json({"category": result});
    } else {
      console.error(result);
      res.status(404).json({"error":"category not found"});
    }
  }).catch(err => {
    console.error(err);
    res.status(500).json({"error": "DBError"});
  });
}

exports.postCategory = async (req, res) => {
    let body = req.body;
    console.log(body);
    const category = new categoryModel(body);
    let result = await category.save((err, result) => {
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
}
