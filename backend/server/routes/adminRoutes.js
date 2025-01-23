const express=require('express');
const router=express.Router();
const userController=require('../controller/userController');
const blogController=require('../controller/blogController');
const categoryController=require('../controller/categoryController');

//Admin registration

router.post('/login',userController.login);
//Blog creation 
router.post('/create/blog',blogController.createBlog);
//Blog update
router.post('/update/blog',blogController.updateBlog);
//Blog Delete
router.post('/delete/blog',blogController.deleteBlog);
//Blog find BY Id
router.post('/blog/find',blogController.findOneBlog);
//categoey Creation
router.post('create/categroy',categoryController.createCategory);
//category Update
router.post('/update/category',categoryController.updateCategory);
//categroy delete
router.post('/delete/category',categoryController.deleteCategory);



module.exports=router;