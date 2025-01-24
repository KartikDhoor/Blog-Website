const Category=require("../modules/categoryModel");

const createCategory=(req,res)=>{
    let validation=""
    if(!req.body.categoryName){
        validation+="category Name is required "
    }
    if(!req.body.description){
        validation+="description is required "
    }
    if(!req.body.categoryImage){
        validation+="Category image is required "
    }
    if(!!validation){
        res.send({success:false,status:400,message:validation})
    }
    else{
        let category=new Category()
        category.categoryName=req.body.categoryName
        category.description=req.body.description
        category.categoryImage=req.body.categoryImage
        category.createdAt=Date.now()
        category.save()
        .then((data)=>{
            res.send({success:true,status:200,message:"the category is created",data:data})
        })
        .catch((err)=>{
            res.send({success:false,status:400,message:err.message})
        })
    }
}
const updateCategory=(req,res)=>{
    let validation=""
    if(!req.body._id){
        validation+="_id is required"
    }
    if(!!validation){
        res.send({success:false,status:400,message:validation})
    }
    else{
        Category.findOne({_id:req.body._id}).exec()
        .then((data)=>{
            if(data==null){
                res.send({success:false,status:400,message:"no category exists on this Id"})
            }
            else{
                if(req.body.categoryName){
                    data.categoryName=req.body.categoryName
                }
                if(req.body.description){
                    data.description=req.body.description
                }
                if(req.body.categoryImage){
                    data.categoryImage=req.body.categoryImage
                }
                data.updatedAt=Date.now()
                data.save()
                .then((updatedData)=>{
                    res.send({success:true,status:200,message:"category is updated",data:updatedData})
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
const findCategory=(req,res)=>{
    let query={}
    if(req.query.categoryName){
        query.categoryName=req.query.categoryName
    }
    Category.find(query).exec()
    .then((data)=>{
        res.send({success:true,status:200,data:data})
    })
    .catch((err)=>{
        res.send({success:false,status:400,message:err.message})
    })
}
const findOneCategory=(req,res)=>{
    let validation=''
    if(!req.body._id){
        validation+="_id is required"
    }
    if(!!validation){
        res.send({success:false,status:400,message:validation})
    }
    else{
        Category.findOne({_id:req.body._id}).exec()
        .then((data)=>{
            res.send({success:true,status:200,data:data})
        })
        .catch((err)=>{
            res.send({success:false,status:400,message:err.message})
        })
    }
}
const deleteCategory=(req,res)=>{
    let validation=""
    if(!req.body._id){
        validation+="_id is required"
    }
    if(!!validation){
        res.send({success:false,status:400,message:validation})
    }
    else{
        Category.findOne({_id:req.body._id}).exec()
        .then((data)=>{
            if(data==null){
                res.send({success:false,status:400,message:"No category existed"})
            }
            else{
                data.status=false
                data.save()
                .then((updatedData)=>{
                    res.send({success:true,status:200,message:"the category is disabled",data:updatedData})
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
module.exports={createCategory,updateCategory,deleteCategory,findCategory,findOneCategory};