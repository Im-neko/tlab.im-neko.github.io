const conf = require("../conf");
const productModel = require("../models/product.model");
const ObjectId = require("mongoose").Types.ObjectId;


exports.getProducts = async (req, res) => { // {{{
  let lang = req.query.lang || "ja";
  productModel.find({}, async (err, result) => {
    if (err) {res.status(500).json({"error": "InternalServerError"}); return;}
    if (result.length) {
      res.json({"products": result});
    } else {
      console.error(result);
      res.status(404).json({"error":"product not found"});
    }
  }).catch(err => {
    console.error(err);
    res.status(500).json({"error": "DBError"});
  });
} // }}}

exports.getProductById = async (req, res) => { // {{{
  let lang = req.query.lang || "all";
  let productId = req.params.id;
  console.log(productId);
  productModel.findOne({_id: ObjectId(productId)}, async (err, result) => {
    if (err) {res.status(500).json({"error": "InternalServerError"}); return;}
    if (result) {
      console.log(result);
      res.json({"product": result});
    } else {
      console.error(result);
      res.status(404).json({"error":"product not found"});
    }
  }).catch(err => {
    console.error(err);
    res.status(500).json({"error": "DBError"});
  });
} // }}}

exports.postProduct = async (req, res) => { // {{{
    let body = req.body
    if (body.userId) body.userId = ObjectId(body.userId);
    if (body.relation) body.relation = body.relation.map((id) => {return ObjectId(id);});
    if (body.countries) body.countries = body.countries.map((id) => {return ObjectId(id);});
    if (body.tags) body.tags = body.tags.map((id) => {return ObjectId(id);});
    if (body.categories) body.categories = body.categories.map((id) => {return ObjectId(id);});
    const date = new Date().getTime();
    body.createdAt = date;
    body.updatedAt = date;
    const product = new productModel(body);
    let result = await product.save((err, result) => {
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
