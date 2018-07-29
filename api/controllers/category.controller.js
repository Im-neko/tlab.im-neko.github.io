const categoryModel = require("../models/category.model");
const ObjectId = require("mongoose").Types.ObjectId;


exports.getCategories = async (req, res) => {
  try{
    const limit = parseInt(req.query.limit, 10);
    const page = parseInt(req.query.page, 10);
    const data = await categoryModel.find({})
      .sort('-created')// 降順、最新順ソート
      .skip((page - 1) * limit)
      .limit(limit);
    if (!data.length) {throw [404, 'no categories']}
    res.json({message: 'success', data: {categories: data}, error: null});
  } catch (e) {
    console.error(e);
    res.status(e[0]||500).json({message: 'failed', data: null, error: ''+(e[1]||e)});
  }
}

exports.getCategoryById = async (req, res) => {
  try{
    const categoryId = req.params.id;
    const data = await categoryModel.findOne({_id: ObjectId(categoryId)});
    if (!data) {throw [404, 'no category']}
    res.json({message: 'success', data: {category: data}, error: null});
  } catch (e) {
    console.error(e);
    res.status(e[0]||500).json({message: 'failed', data: null, error: ''+(e[1]||e)});
  }
}

exports.postCategory = async (req, res) => {
  try{
    const body = req.body;
    body.deleted = false;
    const category = new categoryModel(body);
    const result = await category.save();
    if (!result) {throw [500, 'failed to post']}
    res.json({message: 'success', data: null, error: null});
  } catch (e) {
    console.error(e);
    res.status(e[0]||500).json({message: 'failed', data: null, error: ''+(e[1]||e)});
  }
}
