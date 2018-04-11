const mongoose = require('../db');
const Schema = mongoose.Schema;


const interviewSchema = new Schema({
  userId: {
    type: mongoose.SchemaTypes.ObjectId,
    required: true
  },
  interview_code: {
    type: Number
  },
  relation: {
    // interviewId
    type: [mongoose.SchemaTypes.ObjectId]
  },
  text: {
    type: String,
    required: true
  },
  images: {
    // imageurl
    1: {
      type: String
    },
    2: {
      type: String
    },
    3: {
      type: String
    }
  },
  urls: {
    1: {
      type: String
    },
    2: {
      type: String
    },
    3: {
      type: String
    }
  },
  areas:{
    type: [mongoose.SchemaTypes.ObjectId],
    required: true
  },
  countries: {
    type: [mongoose.SchemaTypes.ObjectId],
    required: true
  },
  tags: {
    type: [mongoose.SchemaTypes.ObjectId]
  },
  categories: {
    type: [mongoose.SchemaTypes.ObjectId]
  },
  celebId: {
    type: [mongoose.SchemaTypes.ObjectId]
  },
  createdAt: {
    type: Number,
    required: true
  },
  updatedAt: {
    type: Number,
    required: true
  }
},{ minimize: false });

module.exports = mongoose.model("interview", interviewSchema);
