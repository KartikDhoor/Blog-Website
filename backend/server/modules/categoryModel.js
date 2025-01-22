const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  
  categoryName:{type:String,reuired:true},
  description: {
    type: String,
    required: true,
  },
  categoryImage:{type:String,},
  status: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt:{
    type:Date,
    default:Date.now,
  }
});

module.exports = mongoose.model('category', commentSchema);