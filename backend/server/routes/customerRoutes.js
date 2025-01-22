const express=require('express');
const router=express.Router();
const userController=require('../controller/userController');
const blogController=require('../controller/blogController');
const categoryController=require('../controller/categoryController');

router.post('/register',userController.register)
router.post('/login',userController.login)
router.get('/blogs',blogController.findBlog)
router.get('/blogs/:slug',blogController.slugFinder)
router.get('/category',categoryController.findCategory);


module.exports=router;