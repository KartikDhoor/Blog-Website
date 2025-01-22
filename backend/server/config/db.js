const mongoose=require('mongoose')


mongoose.connect('mongodb://127.0.0.1:27017/blog').then(()=>{
    console.log('db is connected')
})
.catch((err)=>{
    console.log('there is some error',err)
})