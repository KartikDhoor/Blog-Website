const express=require("express");
const router=express.Router();
const userController=require('../controller/userController');
const blogController=require('../controller/blogController');
const categoryController=require('../controller/categoryController');
const commentController=require("../controller/commentController");
const likeController=require("../controller/likeController");
const jwtchecker=require('../config/jwtChecker');
const upload =require("../config/multer")
//user registration
router.post('/register',userController.register);
//user login
router.post('/login',userController.login);
//user otp verification
router.post('/otp',userController.otpConfirmation);
//blog list
router.post('/blogs',blogController.findBlog);
//blog slug finder
router.post('/blogs/:slug',blogController.slugFinder);
//category list
router.post('/category',categoryController.findCategory);
//category one finder
router.post('/category/find',categoryController.findOneCategory);
//comment find blogID
router.post("/find/blog/comment",commentController.blogComment);
//comment find userId
router.post("/find/user/comment",commentController.userComment);
//comment find CommentID
router.post("/find/comment",commentController.findComment);
//comment create
router.post('/create/comment',commentController.createComment);
//comment update
router.post('/update/comment',commentController.updateComment);
//blog finder
router.post('/blog/find',blogController.findBlog);
//jwt token checker
router.use('/',jwtchecker.customer);
router.post('/like/blog',likeController.likeBlog);
//find one user
router.post("/find/user",userController.findOneUser);
//user profile Update
router.post("/profile/update",upload.single('image'),userController.profileUpdate);
//all the remaining address
router.all('*',(req,res)=>{
    res.send({
        success:false,
        status:404,
        message:"Invalid Address for now"
    })
})

module.exports=router;