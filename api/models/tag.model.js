const mongoose = require('../db');
const Schema = mongoose.Schema;


const tagSchema = new Schema({
  tag_name:{
    type: String
  }
},{ minimize: false });

module.exports = mongoose.model("Tag", tagSchema);
