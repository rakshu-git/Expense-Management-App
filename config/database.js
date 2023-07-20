const mongoose=require('mongoose')

const configureDB=()=>{
    try{
        const db=mongoose.connect('mongodb://127.0.0.1:27017/expense-app')
        console.log('connected to db')
    }
    catch(e){
        console.log('error connecting to db')
    }
}

module.exports=configureDB