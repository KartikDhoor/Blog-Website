const express=require('express');
const router=express.Router();
const userController=require('../controller/userController');
const blogController=require('../controller/blogController');
const categoryController=require('../controller/categoryController');


//user registration
router.post('/register',userController.register);
//user login
router.post('/login',userController.login);
//blog list
router.post('/blogs',blogController.findBlog);
//blog slug finder
router.post('/blogs/:slug',blogController.slugFinder);
//category list
router.post('/category',categoryController.findCategory);
//category one finder
router.post('/category/find',categoryController.findOneCategory);


module.exports=router;