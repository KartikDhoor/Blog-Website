const User = require('../modules/userModel');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const JWT_SECRET=process.env.SECRET_KEY

const register = async (req, res) => {
    let validation = '';
    if (!req.body.name) {
        validation += "name is required "
    }
    if (!req.body.email) {
        validation += "email is required "
    }
    if (!req.body.password) {
        validation += "password is required "
    }
    if (!!validation) {
        res.send({ success: false, status: 400, message: validation })
    }
    else {
        User.findOne({ email: req.body.email })
            .then((existingUser) => {
                if (existingUser) {
                    return res.send({ success: false, status: 400, message: "User already exists" });
                }
                else {
                    const saltRounds = 10;
                    bcrypt.hash(req.body.password, saltRounds)
                        .then((hashedPassword) => {
                            const user = new User({
                                name: req.body.name,
                                email: req.body.email,
                                password: hashedPassword,
                            });

                            user.save()
                            
                                .then((savedUser) => {
                                    const token = jwt.sign({ id: savedUser._id, email: savedUser.email },  process.env.SECRET_KEY, {
                                        expiresIn: "1h",
                                      });
                                    const { password, ...userWithoutpassword } = savedUser.toObject();
                                    res.send({ success: true, status: 200, message: "New user is created", data: userWithoutpassword,token:token });
                                })
                                .catch((err) => {
                                    res.send({ success: false, status: 500, message: err.message });
                                });
                        })
                        .catch((err) => {
                            res.send({ success: false, status: 500, message: "Error checking user: " + err.message });
                        });

                }
            })
            .catch((err) => {
                res.send({ success: false, status: 500, message: "Error checking user: " + err.message });
            });
    }
}
const login = (req, res) => {
    let validation = '';
    if (!req.body.email) {
        validation += "email is required ";
    }
    if (!req.body.password) {
        validation += "password is required ";
    }
    if (validation) {
        res.send({ success: false, status: 400, message: validation });
    } else {
        User.findOne({ email: req.body.email }).exec()
            .then((user) => {
                if (!user) {
                    res.send({
                        success: false,
                        status: 500,
                        message: "User is not registered",
                    });
                } else {
                    // Compare passwords using bcrypt.compare
                    bcrypt.compare(req.body.password, user.password)
                        .then((isPasswordValid) => {
                            if (isPasswordValid) {
                                const token = jwt.sign(
                                    { _id: user._id, email: user.email ,image:user.image,userType:user.userType},
                                    JWT_SECRET,
                                    { expiresIn: "1h" }
                                );
                                const { password, ...userWithoutpassword } = user.toObject();
                                res.send({
                                    success: true,
                                    status: 200,
                                    message: "Login Successful",
                                    data: userWithoutpassword,
                                    token: token,
                                });
                            } else {
                                res.send({
                                    success: false,
                                    status: 400,
                                    message: "The credentials are wrong",
                                });
                            }
                        })
                        .catch((err) => {
                            res.send({
                                success: false,
                                status: 500,
                                message: "Error during password validation: " + err.message,
                            });
                        });
                }
            })
            .catch((err) => {
                res.send({
                    success: false,
                    status: 500,
                    message: "Error during user lookup: " + err.message,
                });
            });
    }
}
const profilePasswordChange = (req, res) => {
    let validation = ''
    if (!req.body.password) {
        validation += "old password is required "
    }
    if (!req.body.newPassword) {
        validation += "new password is required "
    }
    if (!!validation) {
        res.send({ success: false, status: 400, message: validation })
    }
    else {
        User.findOne({ _id: req.body._id }).exec()
            .then((data) => {
                if (data == null) {
                    res.send({ success: false, status: 400, message: "user od this _id not exists" })
                }
                else {
                    if (bcrypt.compare(req.body.password,data.password)) {
                        const saltRounds = 10;
                    const hashedPassword=bcrypt.hash(req.body.newPassword, saltRounds)
                        data.password = hashedPassword
                        data.save()
                            .then((updatedData) => {
                                res.send({ success: true, status: 200, message: "the password is changed" })
                            })
                            .catch((err) => {
                                res.send({ success: false, status: 400, message: err.message })
                            })
                    }
                }
            })
            .catch((err) => {
                res.send({ success: false, status: 400, message: err.message })
            })
    }
}
const findOneUser = (req, res) => {
    
        User.findOne({ _id:req.decoded._id}).exec()
            .then((data) => {
                if (data == null) {
                    res.send({ success: false, status: 400, message: "no users Exists" })
                }
                else {
                    res.send({ success: true, status: 200, message: "user", data: data })
                }
            })
            .catch((err) => {
                res.send({ success: false, status: 400, message: err.message })
            })


}
const deleteUser=(req,res)=>{
    let validation=''
    if(!req.body._id){
        validation+="id is required"
    }
    if(!!validation){
        res.send({success:false,status:400,message:validation})
    }
    else{
        User.findOne({_id:req.body.id}).exec()
        .then((data)=>{
            if(data==null){
                res.send({success:false,status:400,message:"user doesnot exists"})
            }
            else{
                data.status=false
                data.save()
                .then((updatedData)=>{
                    res.send({success:true,status:200,message:"user is delted",data:updatedData})
                })
                .catch((err)=>{
                    res.send({success:false,status:400,message:err.message})
                })
            
            }
        })
        .catch((err)=>{
            res.send({success:false,status:400,message:err.message})
        })
    }
}
const profileUpdate=(req,res)=>{
    let validation=''
    if(req.decoded){
        validation+="decoded data is required"
    }
    if(!!validation){
        res.send({success:false,status:400,message:validation})
    }
    else{
        User.findOne({_id:req.decoded._id}).exec()
        .then((data)=>{
            if(data==null){
                res.send({success:false,status:400,message:"user does not exists"})
            }
            if(!req.body.name){
                data.name=req.body.name
            }
            if(!req.body.email){
                data.email=req.body.email
            }
            if(!req.body.phone){
                data.phone=req.body.phone
            }
            if(!req.body.introduction){
                data.introduction=req.body.introduction
            }
            if(!req.body.image){
                data.image=req.body.image
            }
            data.save()
            .then((updatedData)=>{
                const token = jwt.sign(
                    { _id: updatedData._id, email: updatedData.email ,image:updatedData.image,userType:updatedData.userType},
                    JWT_SECRET,
                    { expiresIn: "1h" }
                );
                const { password, ...userWithoutpassword } = updatedData.toObject();
                res.send({success:false,status:400,message:"the update is done",data:userWithoutpassword,token:token})
            })
            .catch((err) => {
                res.send({
                    success: false,
                    status: 500,
                    message: "Error during user Update: " + err.message,
                });
            });
        })
        .catch((err) => {
            res.send({
                success: false,
                status: 500,
                message: "Error during user Update: " + err.message,
            });
        });
    }
}



module.exports = { register, login, profilePasswordChange, findOneUser, profileUpdate};