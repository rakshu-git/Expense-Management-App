const jwt=require('jsonwebtoken')
require('dotenv').config()
const authenticateUser=(req,res,next)=>{
    console.log("here")
    let token=req.headers.authorization
    console.log('token',token)
        try{
            const tokenData=jwt.verify(token,process.env.JWT_SECRET)
            req.user={
                id:tokenData.id,        
            }
            next()
        }catch(e){
            res.status(401).json(e)
        }   
    }

module.exports=authenticateUser