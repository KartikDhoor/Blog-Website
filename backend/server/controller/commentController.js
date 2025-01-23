const CommentController=require("../modules/commentModel");

const createComment=(req,res)=>{
    let validation=''
    if(!req.body.blogId){
        validation+="blog id is requried"
    }
    if(!req.body.userId){

    }
}


module.exports={createComment};