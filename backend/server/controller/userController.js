const User=require('../modules/userModel');

const register=async(req,res)=>{
    let validation='';
    if(!req.body.email){
        validation+="email is required "
    }
    if(!req.body.password){
        validation+="password is required "
    }
    if(!!validation){
        res.send({success:false,status:400,message:validation})
    }
    else{
        let user =new User()
        user.email=req.body.email
        user.password=req.body.password
        user.save()
        .then((data)=>{
            res.send({success:true,status:200,message:"new user is created",data:data})
        })
        .catch((err)=>{
            res.send({success:false,status:500,message:"customer is not created"})
        })
    }
}
const login=async(req,res)=>{
    let validation='';
    if(!req.body.email){
        validation+="email is required "
    }
    if(!req.body.password){
        validation+="password is required "
    }
    if(!!validation){
        res.send({success:false,status:400,message:validation})
    }
    else{
        User.findOne({email:req.body.email}).exec()
        .then(
            (data)=>{
                if(data==null){
                    res.send({
                        success:false,
                        status:500,
                        message:"user is not register"
                    })
                }
                else{

                }
            }
        )
        .catch((err)=>{
            res.send({success:false,status:400,message:err.message})
        })

    }
}
const profilePasswordChange=(req,res)=>{
    let validation=''
    if(!req.body.password){
        validation+="old password is required "
    }
    if(!req.body.newpassword){
        validation+="new password is required "
    }
    if(!!validation){
        res.send({success:false,status:400,message:validation})
    }
    else{
        User.findOne({_id:req.body._id}).exec()
        .then((data)=>{

        })
        .catch((err)=>{
            res.send({success:false,status:400,message:err.message})
        })
    }
}



module.exports={register,login};