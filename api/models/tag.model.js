const mongoose = require('../db');
const Schema = mongoose.Schema;


const tagSchema = new Schema({
  tag_code: {
    type: Number
  },
  tag_name:{
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

module.exports = mongoose.model("Tag", tagSchema);
