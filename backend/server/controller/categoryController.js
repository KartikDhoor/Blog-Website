const Category=require("../modules/categoryModel");
//customer apis
const findCategory = async (req, res) => {
    try {
      const { categoryName } = req.query;
  
      // Build the query dynamically
      const query = categoryName ? { categoryName: { $regex: categoryName, $options: "i" } } : {};
  
      // Fetch categories from the database
      const categories = await Category.find(query);
  
      if (!categories.length) {
        return res.status(200).json({ success: false, message: "No categories found." });
      }
  
      res.status(200).json({ success: true,length:categories.length, data: categories });
    } catch (err) {
      res.status(500).json({ success: false, message: "Internal server error.", error: err.message });
    }
  };
  
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



//admin apis
const createCategory = async (req, res) => {
     // Check if file is being received
    let validation = "";
  
    if (!req.body.categoryName) {
      validation += "Category Name is required. ";
    }
    if (!req.body.description) {
      validation += "Description is required. ";
    }
    if (!req.file) {
      validation += "Category image is required.";
    }
  
    if (validation) {
      return res.status(400).send({ success: false, status: 400, message: validation });
    }
  
    try {
      let category = new Category();
      category.categoryName = req.body.categoryName;
      category.description = req.body.description;
  
      if (req.file) {
        category.categoryImage = `http://localhost:5000/uploads/${req.file.filename}`;
      }
  
      category.createdAt = Date.now();
  
      const data = await category.save();
      return res.status(200).send({
        success: true,
        status: 200,
        message: "The category is created successfully",
        data: data,
      });
    } catch (err) {
      return res.status(500).send({
        success: false,
        status: 500,
        message: err.message,
      });
    }
  };
  
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
                if (req.file) {
                    data.categoryImage = `http://localhost:5000/uploads/${req.file.filename}`;
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
const dashboardFindCategory = async (req, res) => {
    try {
      const { categoryName } = req.query;
  
      // Build the query dynamically
      const query = categoryName ? { categoryName: { $regex: categoryName, $options: "i" } } : {};
  
      // Fetch categories from the database
      const categories = await Category.find(query);
  
      if (!categories.length) {
        return res.status(404).json({ success: false, message: "No categories found." });
      }
  
      res.status(200).json({ success: true, data: categories });
    } catch (err) {
      res.status(500).json({ success: false, message: "Internal server error.", error: err.message });
    }
  };
  
const dashboardFindOneCategory=(req,res)=>{
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