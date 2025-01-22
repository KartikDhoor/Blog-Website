const Blog = require('../modules/blogModel');

const createBlog = async (req, res) => {
    let validation = ""
    if (!req.body.title) {
        validation += 'title is required for the blog '
    }
    if (!req.body.author) {
        validation += "Author is required for the blog"
    }
    if (!req.body.sections) {
        validation += "section is required"
    }
    if (!req.body.category) {
        validation += 'category is required'
    }
    if (!req.body.publishAt) {
        validation += 'publishing time is required'
    }
    if (!req.body.slug) {
        validation += 'slug is required'
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
        validation
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

    Blog().find()
        .sort({ [sortBy]: order })
        .limit(limit)
        .populate("category", "comment", "like")
        .exec()
        .then((data) => {
            res.send({ success: true, staus: 200, message: 'there is blogs', data: data })
        })
        .catch((err) => {
            res.send({ success: false, staus: 400, message: err.message })

        })
}
const findOneBLog=
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

module.exports = { createBlog, updateBlog, findBlog, deleteBlog };