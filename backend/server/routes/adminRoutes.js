const express=require('express');
const router=express.Router();

const userController=require('../controller/userController');
const blogController=require('../controller/blogController');
const categoryController=require('../controller/categoryController');
const upload =require("../config/multer")
const jwtChecker=require('../config/jwtChecker')
//Admin registration

router.post('/login',userController.login);
//jwt checker
router.use('/',jwtChecker.dashboard);
//Blog creation 
router.post(
    '/create/blog',
    upload.any(),
    blogController.createBlog
  );
//Blog update
router.post(
    '/update/blog',
    upload.any(),
    blogController.updateBlog
);
//Blodashboardg Delete
router.post('/delete/blog',blogController.deleteBlog);
//Blog find List
router.post('/dashboard/blogs/find',blogController.dashboardFindBlog);
//slug Blog Finder
router.get("/dashboard/blogs/:slug",blogController.dashboardSlugFinder)
//category Creation
router.post('/create/categroy',upload.single('categoryImage'),categoryController.createCategory);
//category Update
router.post('/update/category',upload.single('categoryImage'),categoryController.updateCategory);
//categroy delete
router.post('/delete/category',categoryController.deleteCategory);
// //chceker for the token
//all the remaining address
router.all('*',(req,res)=>{
    res.send({
        success:false,
        status:404,
        message:"Invalid Address"
    })
})

module.exports=router;