const Comment=require("../modules/commentModel");

const createComment=(req,res)=>{
    let validation=''
    if(!req.body.blogId){
        validation+="blog id is requried "
    }
    if(!req.body.content){
        validation+="content is required "
    }
    if(!req.body.userId){
        validation+="User id is required"
    }
    if(!!validation){
        res.send({success:false,status:400,message:validation})
    }
    else{
        let comment=new Comment()
        comment.blogId=req.body.blogId
        comment.userId=req.body.userId
        comment.content=req.body.content
        comment.status=true
        comment.date=Date.now()
        comment.save()
        .then((data)=>{
            res.send({success:true,status:200,message:"comment is done",data:data})
        })
        .catch((err)=>{
            res.send({success:false,status:400,message:err.message})
        })
    }
}
const updateComment=(req,res)=>{
    let validation=''
    if(!req.body._id){
        validation+="_id is required"
    }
    if(!!validation){
        res.send({success:false,status:400,message:validation})
    }
    else{
        Comment.findOne({_id:req.body._id}).exec()
        .then((data)=>{
            if(data==null){
                res.send({success:false,status:400,message:"comment did not exists"})
            }
            else{
                data.content=req.body.content
                data.save()
                .then((updatedData)=>{
                    res.send({success:true,status:200,data:updatedData,message:"the message is uppdated"})
                })
                .catch((err)=>{
                    res.send({success:false,status:400,message:err.message})
                })
            }
        })
        .catch((err)=>{
            res.send({success:false,status:400,message:err.message})
        })
    }
}
const deleteComment=(req,res)=>{
    let validation=""
    if(!req.body._id){
        validation+="_id is required"
    }
    if(!!validation){
        res.send({success:false,status:400,message:validation})
    }
    else{
        Comment.findOne({_id:req.body._id}).exec()
        .then((data)=>{
            if(data==null){
                res.send({success:false,status:400,message:"comment does not exists"})
            }
            else{
                data.status=false
                data.save()
                .then((updatedData)=>{
                    res.send({success:true,status:200,message:"comment is delete",data:updatedData})
                })
                .catch((err)=>{
                    res.send({success:false,status:400,message:err.message})
                })
            }
        })
    .catch((err)=>{
        res.send({success:false,status:400,message:err.message})
    })
    }
}

module.exports={createComment,updateComment,deleteComment};