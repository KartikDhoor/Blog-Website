const express=require('express');
const app=express();
const multer=require('multer');
const db=require('./server/config/db')
const customerRoutes=require('./server/routes/customerRoutes')

app.use('/customer',customerRoutes);






app.listen(5000,(err)=>{
    if(err){
        console.log("Error Occured:-",err)
    }
    else
    console.log("Server is running")
})