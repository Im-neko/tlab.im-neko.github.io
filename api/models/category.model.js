const mongoose = require('../db');
const Schema = mongoose.Schema;


const categorySchema = new Schema({
  category_code: {
    type: Number
  },
  category_name:{
    ja: {
      type: String
    },
    en: {
      type: String
    },
    ch: {
      type: String
    },
    fr: {
      type: String
    },
    ge: {
      type: String
    }
  }
},{ minimize: false });

module.exports = mongoose.model("Category", categorySchema);
