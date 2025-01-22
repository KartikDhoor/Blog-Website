const mongoose=require('mongoose')

const userSchema= new mongoose.Schema({
    name:{type:String, default:''},
    email:{ type:String, default:''},
    password:{type:String, default:''},
    userType:{ type:Number, default:2},
    createdAt:{type:Date, default:Date.now},
    status:{ type:Boolean, default:true},
})
module.exports=mongoose.model('user',userSchema);