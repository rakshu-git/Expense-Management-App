const Expense=require('../models/Expense')
const User=require('../models/User')
expensesCltr={}

expensesCltr.create=async(req,res)=>{
    try{
       const body=req.body
       const userId=req.user.id
       const categoryId=req.params.categoryId 
       const expenseObj=new Expense(body)
       expenseObj.userId=userId           //adding this to body object
       expenseObj.categoryId=categoryId   //adding this to body object
       const expense=await expenseObj.save()
       res.json(expense)
    }catch(e){
       res.json(e)
    }
}

expensesCltr.update=async(req,res)=>{
    try{
        const id=req.params.id
        const body=req.body
        const expense=await Expense.findByIdAndUpdate(id,body,{new:true,runValidators:true})
        res.json(expense)
    }catch(e){
        res.json(e)
    }
}

expensesCltr.destroy=async(req,res)=>{
    try{
        const id=req.params.id
        const userId=req.user.id
         const {type}=req.query
         let expense
         if(type== 'delete'){
             expense=await Expense.findOneAndUpdate({_id:id,userId:userId},{isDeleted:true},{new:true,runValidators:true})
            res.json(expense)
         }else if(type=='undo'){
             expense=await Expense.findOneAndUpdate({_id:id,userId:userId},{isDeleted:false},{new:true,runValidators:true})
             res.json(expense)
         }
    }catch(e){
         res.json(e)
    }
}

expensesCltr.destroyAll=async(req,res)=>{
    try{
        const userId=req.user.id
        const {type}=req.query
        let expense
        if(type == 'deletePermanently'){
            expense=await Expense.deleteMany({userId:userId,isDeleted:true})
        }else if(type=='restore'){
          expense=await Expense.updateMany({userId:userId,isDeleted:true},{isDeleted:false})
         }
        res.json(expense)
    }catch(e){
        res.json(e)
   }
}


expensesCltr.list=async(req,res)=>{
    try{
     const id=req.user.id
     const expense=await Expense.find({userId:id,isDeleted:false})  //it should be in one object userid and isDeleted otherwise softdeleted and not deleted list will come together
     res.json(expense)
    }catch(e){
      res.json(e)
    }
}

expensesCltr.undolist=async(req,res)=>{
    try{
     const id=req.user.id
     const expense=await Expense.find({userId:id,isDeleted:true})  //it should be in one object userid and isDeleted otherwise softdeleted and not deleted list will come together
     res.json(expense)
    }catch(e){
      res.json(e)
    }
}

expensesCltr.BudgetLimit = async (req, res) => {
    console.log('hello')
    try {
        const body=req.body
        const userId = req.user.id
        const value =  await Promise.all([
           Expense.find({userId: userId}),
           User.findById(userId) 
        ])
        const [expense, user] = value
        console.log('expense',expense)
        const budget = user.budget
        let amt = 0
        for(let i=0;i<expense.length;i++){
            amt+=expense[i].amount
        }
        console.log('expenseAmt',amt)
        const calc = budget - amt -body.amount
        if(calc > 0) {
           res.json({
                message: `Budget Available in Purse - ${calc} Rs.`
            })
        } else {
            res.json({
                error: 'Budget Limit Exceeded'
            })
        }
    } catch (error) {
        res.json(error)
    }
}

expensesCltr.search = async (req,res)=>{
    try{
       const {text}=req.query
      const searchItems=await Expense.find({note:{$regex:text,$options:"i"}})
      res.json(searchItems)    
    }catch(e){
       res.json(e)
    }
}

expensesCltr.sort = async (req,res)=>{
        try {
            const userId = req.user.id
            const type = req.query.type
            let expense
            if(type == 'Amount-Low to High') {
                expense = await Expense.find({userId: userId}).sort({amount: 1})
            } else if(type == 'Amount-High to Low') {
                expense = await Expense.find({userId: userId}).sort({amount: -1})
            } else if(type == 'A to Z') {
                expense = await Expense.find({userId: userId}).sort({ note: 1 })
            } else if(type == 'Z to A') {
                expense = await Expense.find({userId: userId}).sort({ note: -1 })
            }
            res.json(expense)
        } catch (error) {
            res.json(error)
        }
    }

module.exports=expensesCltr