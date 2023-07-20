const mongoose=require('mongoose')
const Schema=mongoose.Schema
const validator=require('validator')
const userSchema=new Schema({
       email:{
        type:String,
        required:true,
        unique:true,
        validate:{
            validator:function(value){
                return validator.isEmail(value)
            },
            message:function(){
                return 'invalid email'
            }
        }
       },
       password:{
        type:String,
        required:[true,'password cannot be empty'],
        minlength:8,
        maxlength:128
       },
       budget:{
        type:Number,
        default:0
       }
},{timestamps:true})

const User=mongoose.model('User',userSchema)
module.exports=User