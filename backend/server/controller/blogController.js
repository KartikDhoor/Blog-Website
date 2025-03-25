const Blog = require('../modules/blogModel');
const agenda=require('../config/agenda');
const { query } = require('express');
//customer apis

const slugFinder=(req,res)=>{
  let validation=""
  if(!req.params.slug){
      validation+="slug is required"
  }
  if(!!validation){
      res.send({success:false,status:400,message:validation})
  }
  else{
      Blog.findOne({slug:req.params.slug,deleteStatus:false,status:'published'}).populate("category","_id categoryName description").populate({
        path: 'comments',
        populate: {
          path: 'userId',
        },
      }).exec()
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
const findBlog = async (req, res) => {
  console.log(req.query)
  try {
    let sortBy = req.body.sortBy || 'createdAt';
    let order = req.body.order || 'desc';
    let title = req.body.title;
    let category = req.body.category;
    let limit = req.body.limit;
    let page = req.body.page;

    let query = {};
    if (category) query.category = category;
    if (title) query.title = new RegExp(title, "i");

    // Get total blog count for pagination
    const totalBlogs = await Blog.countDocuments(query);
    const totalPages = Math.ceil(totalBlogs / limit);

    // Fetch paginated data
    const data = await Blog.find(query)
      .sort({ [sortBy]: order })
      .skip((page - 1) * limit)
      .limit(limit)
      .populate("category", "categoryName description status")
      .populate({
        path: 'comments',
        populate: { path: 'userId' },
      });

    res.send({
      success: true,
      status: 200,
      message: 'There are blogs',
      length: data.length,
      data: data,
      pagination: {
        totalBlogs,
        totalPages,
        currentPage: page,
        limit
      }
    });
  } catch (err) {
    res.send({ success: false, status: 400, message: err.message });
  }
};
 
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
//admin apis
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
      blog.sections= req.body.sections;
      blog.category = req.body.category;
      blog.publishAt = req.body.publishAt;
      blog.introduction = req.body.introduction;
      blog.slug = req.body.slug;
      blog.status = req.body.status;
  
      if (req.files) {
        // Handle main blog image
        const mainImage = req.files.find(file => file.fieldname === "image");
        if (mainImage) {
          blog.image = `http://localhost:5000/uploads/${mainImage.filename}`;
        }
  
        // Handle section images
        req.files.forEach(file => {
            const match = file.fieldname.match(/sections\[(\d+)\]\[sectionImage\]/);
            if (match) {
              const sectionIndex = parseInt(match[1], 10);
              if (blog.sections && blog.sections[sectionIndex]) {
                blog.sections[sectionIndex].sectionImage = `http://localhost:5000/uploads/${file.filename}`;
              }
            }
          });
    }
  
      const data = await blog.save();
      if(data.status=='draft'){
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
      try{
        if (req.body.title) blog.title = req.body.title;
        if (req.body.author) blog.author = req.body.author;
        if (req.body.readingTime) blog.readingTime = req.body.readingTime; // Ensure parsed JSON
        if (req.body.introduction) blog.introduction = req.body.introduction;
        if (req.body.slug) blog.slug = req.body.slug;
        if (req.body.category) blog.category = req.body.category;
      }
      catch(err){
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
      if (req.files) {
        // Handle main blog image
        const mainImage = req.files.find(file => file.fieldname === "image");
        if (mainImage) {
          blog.image = `http://localhost:5000/uploads/${mainImage.filename}`;
        }
  
        // Handle section images
        req.files.forEach(file => {
          const match = file.fieldname.match(/sections\[(\d+)\]\[sectionImage\]/);
          if (match) {
            const sectionIndex = parseInt(match[1], 10);
            if (blog.sections && blog.sections[sectionIndex]) {
              blog.sections[sectionIndex].sectionImage = `http://localhost:5000/uploads/${file.filename}`;
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
  
const dashboardFindBlog = (req, res) => {  
    let sortBy = req.query.sortBy || 'createdAt';
    let order = req.query.order || 'desc';
    let title = req.body.title;
    let category = req.query.category;
    let limit = parseInt(req.query.limit) || 10;
    let page = parseInt(req.query.page) || 1;
  
    let query = {
      // deleteStatus:false,
    };
    if (category) {
      query.category = category;
    }
    if (title) {
      query.title = new RegExp(title, "i");
    }
  
    Blog.find(query)
      .sort({ [sortBy]: order })
      .skip((page - 1) * limit) // Skip documents for previous pages
      .limit(limit) // Limit the number of documents per page
      .populate("category", "categoryName description status")
      .populate({
        path: 'comments',
        populate: {
          path: 'userId',
        },
      })
      .exec()
      .then((data) => {
        res.send({ 
          success: true, 
          length: data.length, 
          status: 200, 
          message: 'There are blogs', 
          data: data 
        });
      })
      .catch((err) => {
        res.send({ success: false, status: 400, message: err.message });
      });
  };  
const dashboardFindOneBlog= (req,res) =>{
    let validation=''
    if(!req.body._id){
        validation+="_id is required"
    }
    if(!!validation){
        res.send({success:false,status:400,message:validation})
    }
    else{
        Blog.findOne({_id:req.body._id,deleteStatus:false}).populate("category","comment","like").exec()
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
                  data.status='draft'
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
const dashboardSlugFinder=(req,res)=>{
  let validation=""
  if(!req.params.slug){
      validation+="slug is required"
  }
  if(!!validation){
      res.send({success:false,status:400,message:validation})
  }
  else{
      Blog.findOne({slug:req.params.slug}).populate("category","_id categoryName description").populate({
        path: 'comments',
        populate: {
          path: 'userId',
        },
      }).exec()
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



module.exports = {createBlog,updateBlog, findBlog, findOneBlog, deleteBlog ,slugFinder,dashboardFindBlog,dashboardFindOneBlog,dashboardSlugFinder};