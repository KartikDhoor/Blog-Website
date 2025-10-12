const Like=require("../modules/likeModel");
const Blog=require("../modules/blogModel");

const likeBlog = (req, res) => {
    const { userId, blogId } = req.body; // <-- ADD THIS
    let validation = "";
    if (!userId) {
        validation += "user id is required ";
    }
    if (!blogId) {
        validation += "blog id is required";
    }
    if (!!validation) {
        res.send({ success: false, status: 400, message: validation });
    } else {
        Like.findOne({ userId, blogId }).exec()
            .then((existedLike) => {
                if (existedLike) {
                    existedLike.status = !existedLike.status;
                    existedLike.save()
                        .then((updatedLike) => {
                            const message = updatedLike.status
                                ? "Like added successfully."
                                : "Like removed successfully.";
                            res.send({ success: true, status: 200, message, like: updatedLike });
                        })
                        .catch((err) => {
                            res.send({ success: false, status: 400, message: err.message });
                        });
                } else {
                    const newLike = new Like({ userId, blogId, status: true }); // now works
                    return newLike.save()
                        .then((savedLike) => {
                            Blog.findOne({ _id: blogId }).exec()
                                .then((blogData) => {
                                    blogData.likes.push(savedLike._id);
                                    blogData.save()
                                        .then((blogLikes) => {
                                            res.status(201).json({
                                                success: true,
                                                message: "Like added successfully.",
                                                like: savedLike,
                                                data: blogLikes.likes,
                                            });
                                        })
                                        .catch((err) => {
                                            res.status(500).json({
                                                success: false,
                                                message: "Failed to update blog with new like.",
                                                error: err.message,
                                            });
                                        });
                                })
                                .catch((err) => {
                                    res.status(500).json({
                                        success: false,
                                        message: "Failed to update blog with new like.",
                                        error: err.message,
                                    });
                                });
                        });
                }
            })
            .catch((err) => {
                res.send({ success: false, status: 400, message: err.message });
            });
    }
};

const findBlogLike=(req,res)=>{
    let validation=""
    if(!req.body.blogId){
        validation+="blog id is required"
    }
    if(!!validation){
        res.send({success:false,status:400,message:validation})
    }
    else{
        Like.find({blogId:req.body.blogId, status: true }).populate("blogId","title author").populate("userId","_id name").exec()
        .then((data)=>{
            res.send({success:true,status:200,total:data.length,data:data})
        })
        .catch((err)=>{
            res.send({success:false,status:400,message:err.message})
        })
    }
}

const findBlogFalseLike=(req,res)=>{
    let validation=""
    if(!req.body.blogId){
        validation+="blog id is required"
    }
    if(!!validation){
        res.send({success:false,status:400,message:validation})
    }
    else{
        Like.find({blogId:req.body.blogId, status: false }).populate("blogId","title author").populate("userId","_id name").exec()
        .then((data)=>{
            res.send({success:true,status:200,total:data.length,data:data})
        })
        .catch((err)=>{
            res.send({success:false,status:400,message:err.message})
        })
    }
}
const findUserLike=(req,res)=>{
    let validation=""
    if(!req.body.userId){
        validation+="user id is required"
    }
    if(!!validation){
        res.send({success:false,status:400,message:validation})
    }
    else{
        Like.find({userId:req.body.userId}).populate("blogId","title author").populate("userId","_id name").exec()
        .then((data)=>{
            res.send({success:true,status:200,total:data.length,data:data})
        })
        .catch((err)=>{
            res.send({success:false,status:400,message:err.message})
        })
    }
}
module.exports={likeBlog,findBlogLike,findBlogFalseLike,findUserLike};