const mongoose=require('mongoose')

const userSchema= new mongoose.Schema({
    name:{type:String, default:''},
    email:{ type:String, default:''},
    password:{type:String, default:''},
    image:{type:String,default:""},
    userType:{ type:Number, default:2},
    otp:{type:Number,default:0},
    emailVerified:{type:Boolean,default:false},
    createdAt:{type:Date, default:Date.now},
    status:{ type:Boolean, default:true},
})
module.exports=mongoose.model('user',userSchema);