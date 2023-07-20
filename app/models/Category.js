const mongoose=require('mongoose')
const Schema=mongoose.Schema

const categorySchema=new Schema({
    categoryName:{
        type:String,
        required:true
    },
    note:{
        type:String,

    },
    userId:{
        type:Schema.Types.ObjectId,
        required:true
    }

},{timestamps:true})
const Category=mongoose.model("Category",categorySchema)
module.exports=Category