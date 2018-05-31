const conf = require("../conf");
const projectModel = require("../models/project.model");
const ObjectId = require("mongoose").Types.ObjectId;


// not yet

exports.getProjects = async (req, res) => { // {{{
  let lang = req.query.lang || "ja";
  projectModel.find({}, async (err, result) => {
    if (err) {res.status(500).json({"error": "InternalServerError"}); return;}
    if (result.length) {
      res.json({"projects": result});
    } else {
      console.error(result);
      res.status(404).json({"error":"project not found"});
    }
  }).catch(err => {
    console.error(err);
    res.status(500).json({"error": "DBError"});
  });
} // }}}

exports.getProjectById = async (req, res) => { // {{{
  let lang = req.query.lang || "all";
  let projectId = req.params.id;
  console.log(projectId);
  projectModel.findOne({_id: ObjectId(projectId)}, async (err, result) => {
    if (err) {res.status(500).json({"error": "InternalServerError"}); return;}
    if (result) {
      console.log(result);
      res.json({"project": result});
    } else {
      console.error(result);
      res.status(404).json({"error":"project not found"});
    }
  }).catch(err => {
    console.error(err);
    res.status(500).json({"error": "DBError"});
  });
} // }}}

exports.postProject = async (req, res) => { // {{{
    let body = req.body
    if (body.userId) body.userId = ObjectId(body.userId);
    if (body.relation) body.relation = body.relation.map((id) => {return ObjectId(id);});
    if (body.countries) body.countries = body.countries.map((id) => {return ObjectId(id);});
    if (body.tags) body.tags = body.tags.map((id) => {return ObjectId(id);});
    if (body.categories) body.categories = body.categories.map((id) => {return ObjectId(id);});
    const date = new Date().getTime();
    body.created = date;
    body.updated = date;
    const project = new projectModel(body);
    let result = await project.save((err, result) => {
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
