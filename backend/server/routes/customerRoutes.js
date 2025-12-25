const express=require("express");
const router=express.Router();
const userController=require('../controller/userController');
const blogController=require('../controller/blogController');
const categoryController=require('../controller/categoryController');
const commentController=require("../controller/commentController");
const likeController=require("../controller/likeController");
const contactController= require("../controller/contactController");
const jwtchecker=require('../config/jwtChecker');
const { upload, uploadToCloudinaryMiddleware } = require("../config/multer"); // ✅ SINGLE import

//Public routes
router.post('/register',userController.register);
router.post('/login',userController.login);
router.post('/otp',userController.otpConfirmation);
router.post('/blogs',blogController.findBlog);
router.post('/blogs/:slug',blogController.slugFinder);
router.post('/category',categoryController.findCategory);
router.post('/category/find',categoryController.findOneCategory);
router.post("/find/blog/comment",commentController.blogComment);
router.post("/find/user/comment",commentController.userComment);
router.post("/find/comment",commentController.findComment);
router.post('/create/comment',commentController.createComment);
router.post('/update/comment',commentController.updateComment);
router.post('/blog/find',blogController.findBlog);
router.post('/contact',contactController.submitContact);

//Protected routes
router.use('/',jwtchecker.customer);
router.post('/like/blog',likeController.likeBlog);
router.post("/find/user",userController.findOneUser);
//user profile Update ✅ CORRECT
router.post("/profile/update", upload.single('image'), uploadToCloudinaryMiddleware, userController.profileUpdate);

router.all('*',(req,res)=>{
    res.send({
        success:false,
        status:404,
        message:"Invalid Address for now"
    })
});

module.exports=router;
