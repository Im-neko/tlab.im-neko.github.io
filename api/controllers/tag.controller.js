const conf = require("../conf");
const tagModel = require("../models/tag.model");
const ObjectId = require("mongoose").Types.ObjectId;


exports.getTags = async (req, res) => { // {{{
  try{
    const limit = parseInt(req.query.limit, 10);
    const page = parseInt(req.query.page, 10);
    const data = await tagModel.find({})
      .sort('-created')// 降順、最新順ソート
      .skip((page - 1) * limit)
      .limit(limit);
    if (!data.length) {throw [404, 'no articles']}
    res.json({message: 'success', data: {tags: data}, error: null});
  } catch(e) {
    console.error(e);
    res.status(e[0]||500).json({message: 'failed', data: null, error: ''+(e[1]||e)});
  }
} // }}}

exports.getTagById = async (req, res) => { // {{{
  try{
    const tagId = req.params.id;
    const data = await tagModel.findOne({_id: ObjectId(tagId)});
    if (!data) {throw [404, 'no articles']}
    res.json({message: 'success', data: {tag: data}, error: null});
  } catch (e) {
    console.error(e);
    res.status(e[0]||500).json({message: 'failed', data: null, error: ''+(e[1]||e)});
  }
} // }}}

exports.postTag = async (req, res) => { // {{{
  try{
    const tag = new tagModel(body);
    const result = await tag.save();
    if (!result) {throw [500, 'failed to post']}
    res.json({message: 'success', data: null, error: null});
  } catch (e) {
    console.error(e);
    res.status(e[0]||500).json({message: 'failed', data: null, error: ''+(e[1]||e)});
  }
} // }}}
