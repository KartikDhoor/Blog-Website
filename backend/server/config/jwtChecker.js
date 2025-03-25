const jwt=require("jsonwebtoken");
const JWT_SECRET=process.env.SECRET_KEY
const check=(req,res,next)=>{
    let validation=''
    if(!req.body.token){
        validation+="token is required"
    }
    if(!!validation){
        res.send({success:false,status:400,message:validation})
    }
    else{
        jwt.verify(req.body.token,JWT_SECRET,(err,decoded)=>{
            if(err){
                res.send({success:false,status:403,message:"unAuthorization"})
            }
            else{
                req.decoded=decoded
                next()
            }
        });
    }
} 

const dashboard=(req,res,next)=>{
    let token=req.headers.authorization
    let validation=''
    if(!token){
        validation+="token is required"
    }
    if(!!validation){
        res.send({success:false,status:400,message:validation})
    }
    else{
        jwt.verify(token,JWT_SECRET,(err,decoded)=>{
            if(err){
                res.send({success:false,status:403,message:"unAuthorization"})
            }
            else{
                if(decoded.userType==1){
                    next()
                }
                
            }
        });
    }
}
module.exports={check,dashboard}