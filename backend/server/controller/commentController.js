const Comment = require("../modules/commentModel");
const Blog = require('../modules/blogModel');
const User = require("../modules/userModel");
const commentModel = require("../modules/commentModel");

const createComment = (req, res) => {
    let validation = ''
    if (!req.body.blogId) {
        validation += "blog id is requried "
    }
    if (!req.body.content) {
        validation += "content is required "
    }
    if (!req.body.userId) {
        validation += "User id is required"
    }
    if (!!validation) {
        res.send({ success: false, status: 400, message: validation })
    }
    else {
        Blog.findOne({ _id: req.body.blogId }).exec()
            .then((blogData) => {
                if (blogData == null) {
                    res.send({ success: false, status: 400, message: "blog does not exists" })
                }
                else {
                    User.findOne({ _id: req.body.userId }).exec()
                        .then((userData) => {
                            if (userData == null) {
                                res.send({ success: false, status: 400, message: "user does not exists" })
                            }
                            else {
                                let comment = new Comment()
                                comment.blogId = req.body.blogId
                                comment.userId = req.body.userId
                                comment.content = req.body.content
                                comment.status = true
                                comment.date = Date.now()
                                comment.save()
                                    .then((commentData) => {
                                        blogData.comments.push(commentData._id)
                                        blogData.save()
                                        .then((data)=>{
                                            res.send({ success: true, status: 200, message: "comment is done", data:commentData })
                                        })
                                        .catch((err) => {
                                            res.send({ success: false, status: 400, message: err.message })
                                        })
                                    })
                                    .catch((err) => {
                                        res.send({ success: false, status: 400, message: err.message })
                                    })

                            }

                        })
                        .catch((err) => {
                            res.send({ success: false, status: 400, message: err.message })
                        })
                }
            })
            .catch((err) => {
                res.send({ success: false, status: 400, message: err.message })
            })
    }
}
const updateComment = (req, res) => {
    let validation = ''
    if (!req.body._id) {
        validation += "_id is required"
    }
    if (!!validation) {
        res.send({ success: false, status: 400, message: validation })
    }
    else {
        Comment.findOne({ _id: req.body._id }).exec()
            .then((data) => {
                if (data == null) {
                    res.send({ success: false, status: 400, message: "comment did not exists" })
                }
                else {
                    data.content = req.body.content
                    data.save()
                        .then((updatedData) => {
                            res.send({ success: true, status: 200, data: updatedData, message: "the message is uppdated" })
                        })
                        .catch((err) => {
                            res.send({ success: false, status: 400, message: err.message })
                        })
                }
            })
            .catch((err) => {
                res.send({ success: false, status: 400, message: err.message })
            })
    }
}
const deleteComment = (req, res) => {
    let validation = ""
    if (!req.body._id) {
        validation += "_id is required"
    }
    if (!!validation) {
        res.send({ success: false, status: 400, message: validation })
    }
    else {
        Comment.findOne({ _id: req.body._id }).exec()
            .then((data) => {
                if (data == null) {
                    res.send({ success: false, status: 400, message: "comment does not exists" })
                }
                else {
                    data.status = false
                    data.save()
                        .then((updatedData) => {
                            res.send({ success: true, status: 200, message: "comment is delete", data: updatedData })
                        })
                        .catch((err) => {
                            res.send({ success: false, status: 400, message: err.message })
                        })
                }
            })
            .catch((err) => {
                res.send({ success: false, status: 400, message: err.message })
            })
    }
}
const findComment=(req,res)=>{
    let validation=''
    if(!req.body._id){
        validation+="_id is required"
    }
    if(!!validation){
        res.send({success:false,status:400,message:validation})
    }
    else{
        Comment.findOne({_id:req.body._id}).populate("blog","user").exec()
        .then((data)=>{
            res.send({success:true,status:200,data:data})
        })
        .catch((err)=>{
            res.send({success:false,status:400,message:err.message})
        })
    }
}
const blogComment=(req,res)=>{
    let validation=""
    if(!req.body.blogId){
        validation+="blog id is required"
    }
    if(!!validation){
        res.send({success:false,status:400,message:validation})
    }
    else{
        Comment.find({blogId:req.body.blogId}).populate("userId").populate("blogId")
        .exec()
        .then((data)=>{
            res.send({success:true,status:200,total:data.length,data:data})
        })
        .catch((err)=>{
            res.send({success:false,status:400,message:err.message})
        })
    }
}
const userComment=(req,res)=>{
    let validation=""
    if(req.body.userId){
        validation+="user id is required"
    }
    if(!!validation){
        res.send({success:false,status:400,message:validation})
    }
    else{
        Comment.find({userId:req.body.userId}).populate("user","blog").exec()
        .then((data)=>{
            res.send({success:true,status:200,data:data})
        })
        .catch((err)=>{
            res.send({success:false,status:400,message:err.message})
        })
    }
}

module.exports = { createComment, updateComment, deleteComment,findComment,blogComment,userComment};