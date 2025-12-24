const express=require('express');
const router=express.Router();

const userController=require('../controller/userController');
const blogController=require('../controller/blogController');
const categoryController=require('../controller/categoryController');
const { upload, uploadToCloudinaryMiddleware } = require("../config/multer"); // ✅ SINGLE import
const jwtChecker=require('../config/jwtChecker');

//Admin login
router.post('/login',userController.login);

//jwt checker
router.use('/',jwtChecker.dashboard);

//Blog routes ✅ CORRECT
router.post('/create/blog', upload.any(), uploadToCloudinaryMiddleware, blogController.createBlog);
router.post('/update/blog', upload.any(), uploadToCloudinaryMiddleware, blogController.updateBlog);

//Category routes (single image)
router.post('/create/category', upload.single('categoryImage'), uploadToCloudinaryMiddleware, categoryController.createCategory);
router.post('/update/category', upload.single('categoryImage'), uploadToCloudinaryMiddleware, categoryController.updateCategory);

//Other routes...
router.post('/delete/blog',blogController.deleteBlog);
router.post('/dashboard/blogs/find',blogController.dashboardFindBlog);
router.get("/dashboard/blogs/:slug",blogController.dashboardSlugFinder);
router.post('/delete/category',categoryController.deleteCategory);

router.all('*',(req,res)=>{
    res.send({
        success:false,
        status:404,
        message:"Invalid Address"
    })
});

module.exports=router;
