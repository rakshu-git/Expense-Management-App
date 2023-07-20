const User=require('../models/User')
const Expense=require('../models/Expense')
const Category=require('../models/Category')
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')
require('dotenv').config()

const usersCltr={}

usersCltr.register=async (req,res)=>{
    try{
        const body=req.body
        const userObj=await User(body)
        const salt= await bcrypt.genSalt()
        const hashPassword=await bcrypt.hash(userObj.password,salt)
        console.log(hashPassword)
        userObj.password=hashPassword
        const user=await userObj.save()
        res.json(user)

    }catch(e){
        res.json(e)
    }
}

usersCltr.login=async (req,res)=>{
    try{
    const body=req.body
    const userObj=await User.findOne({email:body.email})
    if(userObj){
        const result = await bcrypt.compare(body.password,userObj.password)
        if(result){
            const tokenData={
                id:userObj._id
            }
            const token=jwt.sign(tokenData,process.env.JWT_SECRET)
            console.log(token)
            res.json(token)
        }else{
            res.json({errors:'invaild password'})
        }
    }else{
        res.json({errors:"invalid email"})
    }
}catch(e){
    res.json(e)
}
}

usersCltr.account=async (req,res)=>{
    try{
        const id=req.user.id
        const users=await User.findById(id)
        res.json(users)
    }catch(e){
        res.json(e)
    }

}

usersCltr.destroy=async(req,res)=>{
    try{
        const id=req.user.id        //because user only need to be delete
        const user=await User.findByIdAndDelete(id)
        const category=await Category.deleteMany({userId:id})
        const expense=await Expense.deleteMany({userId:id})
        res.json(user)
    }catch(e){
        res.json(e)
    }
}

usersCltr.update=async(req,res)=>{
    try{
       const id=req.user.id
       const body=req.body
       const user=await User.findByIdAndUpdate(id,body,{new:true,runValidators:true})
       if(user){
        res.json(user)
       }else{
        res.json({})
       }
    }catch(e){
        res.json(e)
    }
}
module.exports=usersCltr