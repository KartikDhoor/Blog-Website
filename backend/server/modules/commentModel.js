const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId, ref: 'user',
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  blogId:{
    type:mongoose.Schema.Types.ObjectId, ref: 'blog'
  },
  likes: {
    type: Number,
    default: 0,  // Number of likes for this comment
  },
});

module.exports = mongoose.model('comment', commentSchema);

