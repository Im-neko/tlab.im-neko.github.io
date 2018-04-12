const mongoose = require('../db');
const Schema = mongoose.Schema;


const categorySchema = new Schema({
  category_name:{
    type: String
  }
},{ minimize: false });

module.exports = mongoose.model("Category", categorySchema);
