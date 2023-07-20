const Category=require('../models/Category')

const categoryCltr={}

categoryCltr.list=async (req,res)=>{
    try{
       const userId=req.user.id
       const category=await Category.find({userId:userId})  //Doubt
       if(category){
        res.json(category)
       }else{
        res.json(e)
       }
      
    }catch(e){
       res.json(e)
    }
}

categoryCltr.show=async (req,res)=>{
    try{
        const id=req.params.id
        const body=req.body
        const category=await Category.findById(id)
        if(category){
            res.json(category)
        }else{
            res.json(e)
        }
    }catch(error){
          res.json({error:"Category not present"})
    }
}

categoryCltr.create=async (req,res)=>{
    try{
        const body=req.body
        const categoryObj=new Category(body)
        categoryObj.userId=req.user.id
        const category=await categoryObj.save()
        res.json(category)
    }catch(e){
        res.json(e)
    }
}

module.exports=categoryCltr