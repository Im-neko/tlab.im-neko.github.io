const conf = require("../conf");
const tagModel = require("../models/tag.model");
const ObjectId = require("mongoose").Types.ObjectId;


exports.getTags = async (req, res) => { // {{{
  let lang = req.query.lang || "ja";
  tagModel.find({}, async (err, result) => {
    if (err) {res.status(500).json({"error": "InternalServerError"}); return;}
    if (result.length) {
      res.json({"tags": result});
    } else {
      console.error(result);
      res.status(404).json({"error":"tag not found"});
    }
  }).catch(err => {
    console.error(err);
    res.status(500).json({"error": "DBError"});
  });
} // }}}

exports.getTagById = async (req, res) => { // {{{
  let lang = req.query.lang || "all";
  let tagId = req.params.id;
  console.log(tagId);
  tagModel.findOne({_id: ObjectId(tagId)}, async (err, result) => { 
    if (err) {res.status(500).json({"error": "InternalServerError"}); return;}
    if (result) {
      console.log(result);
      res.json({"tag": result});
    } else {
      console.error(result);
      res.status(404).json({"error":"tag not found"});
    }
  }).catch(err => {
    console.error(err);
    res.status(500).json({"error": "DBError"});
  });
} // }}}

exports.postTag = async (req, res) => { // {{{
    let body = req.body;
    console.log(body);
    const tag = new tagModel(body);
    let result = await tag.save((err, result) => { // {{{
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
    }); // }}}
} // }}}
