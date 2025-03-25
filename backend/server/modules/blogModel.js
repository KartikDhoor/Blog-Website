const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  readingTime: { type: Number, default: 0 },
  image: {type:String,default:""},
  introduction:{type:String,default:''},
  slug: {
    type: String,
    required:true,
  },
  sections: [
    {
      title: { type: String, default:''},
      content: { type: String, default:''},
      sectionImage: { type: String, default:''},
      url: { type:String, default:''},
    },
  ],
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'category',
    required: true, 
  },
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'comment' }],
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
  deleteStatus:{
    type:Boolean,
    default:false,
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

