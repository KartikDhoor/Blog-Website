const express=require('express');
const app=express();
const multer=require('multer');
const db=require('./server/config/db')
const customerRoutes=require('./server/routes/customerRoutes')
const adminRoutes=require('./server/routes/adminRoutes')



app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.use('/customer',customerRoutes);
app.use('/admin',adminRoutes);





app.listen(5000,(err)=>{
    if(err){
        console.log("Error Occured:-",err)
    }
    else
    console.log("Server is running in 5000")
})