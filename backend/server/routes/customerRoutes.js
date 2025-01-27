const express=require('express');
const router=express.Router();
const userController=require('../controller/userController');
const blogController=require('../controller/blogController');
const categoryController=require('../controller/categoryController');
const commentController=require("../controller/commentController");


//user registration
router.post('/register',userController.register);
//user login
router.post('/login',userController.login);
//blog list
router.get('/blogs',blogController.findBlog);
//blog slug finder
router.get('/blogs/:slug',blogController.slugFinder);
//category list
router.post('/category',categoryController.findCategory);
//category one finder
router.post('/category/find',categoryController.findOneCategory);
//comment create
router.post('/create/comment',commentController.createComment);
//comment update
router.post('/update/comment',commentController.updateComment);
//comment find blogID
router.post("/find/blog/comment",commentController.blogComment);
//comment find userId
router.post("/find/user/comment",commentController.userComment);
//comment find CommentID
router.post("/find/comment",commentController.findComment);

module.exports=router;