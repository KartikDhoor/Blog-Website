const mongoose=require('mongoose');
const likeSchema=new mongoose.Schema({
    userId:{type:mongoose.Schema.Types.ObjectId, ref: "user"},
    blogId:{type:mongoose.Schema.Types.ObjectId, ref: 'blog'},
    status:{type:Boolean,required:true,default:true},
})
module.exports=mongoose.model('like',likeSchema);