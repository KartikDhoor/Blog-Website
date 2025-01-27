const Blog = require('../modules/blogModel');

const createBlog = async (req, res) => {
    let validation = ""
    if (!req.body.title) {
        validation += 'title is required for the blog '
    }
    if (!req.body.author) {
        validation += "Author is required for the blog "
    }
    if(!req.body.readingTime){
        validation += "reading time is required for the blog "
    }
    if (!req.body.sections) {
        validation += "section is required "
    }
    if (!req.body.category) {
        validation += 'category is required '
    }
    if (!req.body.publishAt) {
        validation += 'publishing time is required '
    }
    if (!req.body.slug) {
        validation += 'slug is required '
    }
    if (!!validation) {
        res.send({ success: false, status: 400, message: validation })
    }
    else {
        let blog = new Blog()
        blog.title = req.body.title
        blog.author = req.body.author
        blog.readingTime = req.body.readingTime
        blog.sections = req.body.sections
        blog.category = req.body.category
        blog.publishAt = req.body.publishAt
        blog.slug = req.body.slug
        blog.save()
            .then((data) => {
                res.send({ success: true, status: 200, message: "blog Added", data: data })
            })
            .catch((err) => {
                res.send({ success: false, status: 400, message: err.message })
            })
    }
}
const updateBlog = (req, res) => {
    let validation = ""
    if (!req.body._id) {
        validation+='id is required'
    }
    if (!!validation) {
        res.send({ success: false, status: 400, message: validation })
    }
    else {
        Blog.findOne({ _id: req.body._id }).exec()
            .then((data) => {
                if (data == null) {
                    res.send({ success: false, status: 400, message: "product does not exists" })
                }
                else {
                    if (req.body.title) {
                        data.title = req.body.title
                    }
                    if (req.body.author) {
                        data.author = req.body.author
                    }
                    if (req.body.readingTime) {
                        data.readingTime = req.body.readingTime
                    }
                    if (req.body.sections) {
                        data.sections = req.body.sections
                    }
                    if (req.body.category) {
                        data.category = req.body.category
                    }
                    if(req.body.image){
                        data.image=req.body.image
                    }
                    data.updatedAt = Date.now()
                    data.save()
                        .then((updatedData) => {
                            res.send({ success: true, status: 200, message: "The blog is updated", data: updatedData })
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
const findBlog = (req, res) => {
    let sortBy = req.query.sortBy;
    let order = req.query.order;
    let title = req.body.title;
    let category = req.query.category;
    let limit = req.query.limit;
    let page = req.query.page;

    let query = {};
    if (category) {
        query.category = category;
    }
    if (title) {
        query.title = new RegExp(title, "i");
    }

    if (!sortBy) {
        sortBy = 'createdAt';
    }
    if (!order) {
        order = 'desc';
    }
    if (!limit) {
        limit = 10;
    }
    if (!page) {
        page = 1;
    }

    Blog.find()
        .sort({ [sortBy]: order })
        .limit(limit)
        .populate("category", "categoryName description status")
        .populate("comments","content userId ")
        // .populate( "likes", 'userId status')
        .exec()
        .then((data) => {
            res.send({ success: true, staus: 200, message: 'there is blogs', data: data })
        })
        .catch((err) => {
            res.send({ success: false, staus: 400, message: err.message })

        })
}
const findOneBlog= (req,res) =>{
    let validation=''
    if(!req.body._id){
        validation+="_id is required"
    }
    if(!!validation){
        res.send({success:false,status:400,message:validation})
    }
    else{
        Blog.findOne({_id:req.body._id}).populate("category","comment","like").exec()
        .then((data)=>{
            res.send({success:true,status:200,message:"here is the blog",data:data})
        })
        .catch((err)=>{
            res.send({success:false,status:400,message:err.message})
        })
    }
}
const deleteBlog = (req, res) => {
    let validation = ""
    if (!req.body._id) {
        validation += "_id is required "
    }
    if (!!validation) {
        res.send({ success: false, status: 400, message: validation })
    }
    else {
        Blog.findOne({ _id: req.body._id }).populate("category", "comment", "like").exec()
            .then((data) => {
                if (data == null) {
                    res.send({
                        success: false,
                        status: 500,
                        message: "blog did not exists"
                    })
                }
                else {
                    data.status = "draft"
                    data.save()
                        .then((updatedData) => {
                            res.send({ success: true, status: 200, message: "blog is now in draft", data: updatedData })
                        })
                        .catch((err) => {
                            res.send({ success: false, status: 404, message: err.message })
                        })
                }
            })
            .catch((err) => {
                res.send({ success: false, status: 400, message: err.message })
            })
    }
}
const slugFinder=(req,res)=>{
    let validation=""
    if(!req.params.slug){
        validation+="slug is required"
    }
    if(!!validation){
        res.send({success:false,status:400,message:validation})
    }
    else{
        Blog.findOne({slug:req.params.slug}).populate("category","_id categoryName description").populate("comments","_id content").exec()
        .then((data)=>{
            if(data==null){
                res.send({success:false,status:400,message:"no blog existed"})
            }
            else{
            res.send({success:true,status:200,data:data})
            }
        })
        .catch((err)=>{
            res.send({success:false,status:400,message:err.message})
        })
    }
}

module.exports = { createBlog, updateBlog, findBlog, findOneBlog, deleteBlog ,slugFinder};