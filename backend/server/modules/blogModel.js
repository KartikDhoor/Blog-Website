const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  readingTime: { type: Number, default: 0 },
  slug: {
    type: String,
    required:true,
  },
  sections: [
    {
      title: { type: String,},
      content: { type: String,},
      image: { type: String,},
      url: { type:String,},
    },
  ],
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true, 
  },
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
  publishAt: {
    type: Date,
    required: true,
    default:Date.now,
  },
  status: {
    type: String,
    enum: ['draft', 'published'],
    default: 'draft',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  views: {
    type: Number,
    default: 0,
  },
  likes: [{type:mongoose.Schema.Types.ObjectId, ref:"like"}],
});

module.exports = mongoose.model('blog', blogSchema);

