
const Blog = require('../modules/blogModel');
const agenda = require('../config/agenda');
const Like = require('../modules/likeModel');
const mongoose = require('mongoose');


// ==========================================
// FILE: server/controller/blogController.js
// COMPLETE PAGINATION IMPLEMENTATION
// ==========================================

// ===== CUSTOMER ENDPOINTS (Public + Authenticated) =====
const findBlog = async (req, res) => {
  try {
    // Pagination defaults
    const page = parseInt(req.body.page) || 1;
    const limit = parseInt(req.body.limit) || 10;
    const skip = (page - 1) * limit;

    // Search & Filter params
    let query = { deleteStatus: false };
    const title = req.body.title;
    const category = req.body.category;
    const status = req.body.status || 'published'; // Default to published

    if (title) query.title = new RegExp(title, 'i');
    if (category) query.category = category;
    if (status !== 'all') query.status = status;

    // Sorting
    const sortBy = req.body.sortBy || 'createdAt';
    const order = req.body.order === 'asc' ? 1 : -1;

    // Get total count for pagination
    const totalBlogs = await Blog.countDocuments(query);

    // Fetch paginated blogs
    const data = await Blog.find(query)
      .sort({ [sortBy]: order })
      .skip(skip)
      .limit(limit)
      .populate('category', 'categoryName description status')
      .populate({
        path: 'comments',
        populate: {
          path: 'userId',
          select: 'name image'
        }
      })
      .populate({
        path: 'likes',
        select: 'userId status',
        match: { status: true }
      })
      .exec();

    const totalPages = Math.ceil(totalBlogs / limit);

    res.send({
      success: true,
      status: 200,
      message: `Found ${data.length} blogs`,
      data: data,
      pagination: {
        currentPage: page,
        totalPages,
        totalBlogs,
        limit,
        hasNext: page < totalPages,
        hasPrev: page > 1
      }
    });
  } catch (err) {
    res.send({
      success: false,
      status: 400,
      message: err.message
    });
  }
};

// ===== SINGLE BLOG VIEWER (No pagination needed) =====
const slugFinder = async (req, res) => {
  try {
    const { slug } = req.params;

    if (!slug) {
      return res.send({
        success: false,
        status: 400,
        message: 'Slug is required'
      });
    }

    // Find blog and increment views
    const blog = await Blog.findOneAndUpdate(
      { slug, deleteStatus: false, status: 'published' },
      { $inc: { views: 1 } },
      { new: true }
    )
      .populate('category', 'categoryName description')
      .populate({
        path: 'comments',
        populate: { path: 'userId', select: 'name image' }
      })
      .populate('likes', 'userId status')
      .exec();

    if (!blog) {
      return res.send({
        success: false,
        status: 404,
        message: 'No blog existed'
      });
    }

    // Check if current user liked (if userId provided)
    let likedByUser = false;
    let totalLikes = 0;
    if (req.body.userId) {
      const like = await require('../modules/likeModel').findOne({
        blogId: blog._id,
        userId: req.body.userId,
        status: true
      }).exec();
      likedByUser = !!like;
    }

    const likes = await require('../modules/likeModel').find({
      blogId: blog._id,
      status: true
    }).exec();
    totalLikes = likes.length;

    res.send({
      success: true,
      status: 200,
      data: blog,
      likedByUser,
      totalLikes
    });
  } catch (err) {
    res.send({
      success: false,
      status: 400,
      message: err.message
    });
  }
};

// ===== ADMIN DASHBOARD ENDPOINTS =====
const dashboardFindBlog = async (req, res) => {
  try {
    // Pagination defaults
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // Filter params (query string)
    let query = { deleteStatus: false };
    const title = req.body.title;
    const category = req.query.category;

    if (title) query.title = new RegExp(title, 'i');
    if (category) query.category = category;

    // Sorting (query string)
    const sortBy = req.query.sortBy || 'createdAt';
    const order = req.query.order === 'asc' ? 1 : -1;

    // Get total count
    const totalBlogs = await Blog.countDocuments(query);

    // Fetch paginated data
    const data = await Blog.find(query)
      .sort({ [sortBy]: order })
      .skip(skip)
      .limit(limit)
      .populate('category', 'categoryName description status')
      .populate({
        path: 'comments',
        populate: { path: 'userId', select: 'name image' }
      })
      .exec();

    const totalPages = Math.ceil(totalBlogs / limit);

    res.send({
      success: true,
      status: 200,
      message: `Found ${data.length} blogs`,
      data: data,
      pagination: {
        currentPage: page,
        totalPages,
        totalBlogs,
        limit,
        hasNext: page < totalPages,
        hasPrev: page > 1
      }
    });
  } catch (err) {
    res.send({
      success: false,
      status: 400,
      message: err.message
    });
  }
};

// ===== ADMIN SINGLE BLOG (No pagination) =====
const dashboardFindOneBlog = (req, res) => {
  let validation = '';
  if (!req.body.id) validation = 'id is required';

  if (!!validation) {
    res.send({ success: false, status: 400, message: validation });
  } else {
    Blog.findOne({ _id: req.body.id, deleteStatus: false })
      .populate('category', 'categoryName description status')
      .populate('comments', 'userId content date status')
      .populate('likes')
      .exec()
      .then(data => {
        res.send({ success: true, status: 200, message: 'here is the blog', data: data });
      })
      .catch(err => {
        res.send({ success: false, status: 400, message: err.message });
      });
  }
};

// ===== ADMIN SLUG FINDER (No pagination) =====
const dashboardSlugFinder = (req, res) => {
  let validation = '';
  if (!req.params.slug) validation = 'slug is required';

  if (!!validation) {
    res.send({ success: false, status: 400, message: validation });
  } else {
    Blog.findOne({ slug: req.params.slug })
      .populate('category', 'id categoryName description')
      .populate({
        path: 'comments',
        populate: { path: 'userId', select: 'id name image' }
      })
      .exec()
      .then(data => {
        if (data === null) {
          res.send({ success: false, status: 400, message: 'no blog existed' });
        } else {
          res.send({ success: true, status: 200, data: data });
        }
      })
      .catch(err => {
        res.send({ success: false, status: 400, message: err.message });
      });
  }
};

// ===== EXISTING CRUD (unchanged) =====
const createBlog = async (req, res) => {


  let validation = "";
  if (!req.body.title) validation += 'Title is required for the blog. ';
  if (!req.body.author) validation += "Author is required for the blog. ";
  if (!req.body.readingTime) validation += "Reading time is required for the blog. ";
  if (!req.body.sections) validation += "Section is required. ";
  if (!req.body.category) validation += "Category is required. ";
  if (!req.body.publishAt) validation += "Publishing time is required. ";
  if (!req.body.slug) validation += "Slug is required. ";

  if (!!validation) {
    return res.status(400).send({ success: false, message: validation });
  }

  try {
    const slugValidation = await Blog.findOne({ slug: req.body.slug }).exec();
    if (slugValidation) {
      return res.status(400).send({ success: false, message: "Slug is already in use" });
    }

    let blog = new Blog();
    blog.title = req.body.title;
    blog.author = req.body.author;
    blog.readingTime = req.body.readingTime;
    blog.sections = req.body.sections;
    blog.category = req.body.category;
    blog.publishAt = req.body.publishAt;
    blog.introduction = req.body.introduction;
    blog.slug = req.body.slug;
    blog.status = req.body.status;

    // CLOUDINARY: Handle Cloudinary URLs
    if (req.cloudinaryFiles) {
      // Main blog image
      const mainImage = req.cloudinaryFiles.find(file => file.fieldname === "image");
      if (mainImage) {
        blog.image = mainImage.cloudinaryUrl; // ✅ Cloudinary URL
      }

      // Section images
      req.cloudinaryFiles.forEach(cloudFile => {
        const match = cloudFile.fieldname.match(/sections\[(\d+)\]\[sectionImage\]/);
        if (match) {
          const sectionIndex = parseInt(match[1], 10);
          if (blog.sections && blog.sections[sectionIndex]) {
            blog.sections[sectionIndex].sectionImage = cloudFile.cloudinaryUrl; // ✅ Cloudinary URL
          }
        }
      });
    }


    const data = await blog.save();
    if (data.status == 'draft') {
      const publishTime = new Date(blog.publishAt);
      agenda.schedule(publishTime, 'publish blog', { blogId: data._id });
    }

    agenda.start();
    return res.status(200).send({ success: true, message: "Blog Added", data });
  } catch (err) {
    console.error(err);
    return res.status(500).send({ success: false, message: err.message });
  }
};

const updateBlog = async (req, res) => {
  let validation = "";
  if (!req.body._id) validation += "ID is required. ";
  if (!!validation) {
    return res.status(400).send({ success: false, message: validation });
  }

  try {
    const blog = await Blog.findOne({ _id: req.body._id }).exec();
    if (!blog) {
      return res.status(400).send({ success: false, message: "Blog does not exist." });
    }

    // Update fields conditionally
    try {
      if (req.body.title) blog.title = req.body.title;
      if (req.body.author) blog.author = req.body.author;
      if (req.body.readingTime) blog.readingTime = req.body.readingTime; // Ensure parsed JSON
      if (req.body.introduction) blog.introduction = req.body.introduction;
      if (req.body.slug) blog.slug = req.body.slug;
      if (req.body.category) blog.category = req.body.category;
    }
    catch (err) {
      console.log(err.message);
    }
    if (req.body.sections) {
      try {
        blog.sections = JSON.parse(req.body.sections);
      } catch (error) {
        return res.status(400).send({ success: false, message: "Invalid JSON in sections" });
      }
    }

    // Handle images from the request
    // 🚀 CLOUDINARY: Handle Cloudinary URLs
    if (req.cloudinaryFiles) {
      // Main blog image
      const mainImage = req.cloudinaryFiles.find(file => file.fieldname === "image");
      if (mainImage) {
        blog.image = mainImage.cloudinaryUrl; // ✅ Cloudinary URL
      }

      // Section images
      req.cloudinaryFiles.forEach(cloudFile => {
        const match = cloudFile.fieldname.match(/sections\[(\d+)\]\[sectionImage\]/);
        if (match) {
          const sectionIndex = parseInt(match[1], 10);
          if (blog.sections && blog.sections[sectionIndex]) {
            blog.sections[sectionIndex].sectionImage = cloudFile.cloudinaryUrl; // ✅ Cloudinary URL
          }
        }
      });
    }


    blog.updatedAt = Date.now();

    const updatedBlog = await blog.save();
    return res.status(200).send({ success: true, message: "The blog is updated", data: updatedBlog });

  } catch (err) {
    console.error(err.message);
    return res.status(500).send({ success: false, message: err.message });
  }
};

const deleteBlog = (req, res) => {
  let validation = ""
  if (!req.body._id) {
    validation += "_id is required "
  }
  if (!!validation) {
    res.send({ success: false, status: 400, message: validation })
  }
  else {
    Blog.findOne({ _id: req.body._id }).exec()
      .then((data) => {
        if (data == null) {
          res.send({
            success: false,
            status: 500,
            message: "blog did not exists"
          })
        }
        else {
          data.status = 'draft'
          data.deleteStatus = true
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


module.exports = {
  findBlog,
  slugFinder,
  dashboardFindBlog,
  dashboardFindOneBlog,
  dashboardSlugFinder,
  createBlog,
  updateBlog,
  deleteBlog
};



