const mongoose = require('../config/db');
const Schema = mongoose.Schema;


const categorySchema = new Schema({
  teamId: {
    type: mongoose.SchemaTypes.ObjectId,
    required: true
  },
  category_name:{
    type: String,
    required: true
  },
  created:{
    // unixtime
    type: Number,
    required: true
  },
  updated: {
    // unixtime
    type: Number,
    required: true
  },
  deleted: {
    type: Boolean,
    required: true
  }
},{ minimize: false });

module.exports = mongoose.model("Category", categorySchema);
