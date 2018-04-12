const mongoose = require('../db');
const Schema = mongoose.Schema;


const productSchema = new Schema({
  userId: {
    type: mongoose.SchemaTypes.ObjectId,
    required: true
  },
  relation: {
    // productId
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
  tags: {
    type: [mongoose.SchemaTypes.ObjectId]
  },
  categories: {
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

module.exports = mongoose.model("product", productSchema);
