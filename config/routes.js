const express=require('express')
const router=express.Router()
const usersCltr=require('../app/controllers/usersCltr')
const categoryCltr=require('../app/controllers/categoryCltr')
const expensesCltr=require('../app/controllers/expensesCltr')
const authenticateUser = require('../middleware/authenticate')

router.post('/api/users/register',usersCltr.register)
router.post('/api/users/login',usersCltr.login)
router.get('/api/users/account',authenticateUser,usersCltr.account)
router.delete('/api/users/delete/:id',authenticateUser,usersCltr.destroy)
router.put('/api/users/budget/update',authenticateUser,usersCltr.update)

//category
router.get('/api/users/show',authenticateUser,categoryCltr.list)
router.get('/api/users/show/:id',authenticateUser,categoryCltr.show)
router.post('/api/users/create',authenticateUser,categoryCltr.create)

//expense

router.get('/api/users/list',authenticateUser,expensesCltr.list)
router.get('/api/expense/undolist',authenticateUser,expensesCltr.undolist)
router.get('/api/expense/search',authenticateUser,expensesCltr.search)
router.get('/api/expense/sort',authenticateUser,expensesCltr.sort)
router.post('/api/expense/budgetLimit',authenticateUser,expensesCltr.BudgetLimit)
router.delete('/api/expense/deleteAll',authenticateUser,expensesCltr.destroyAll)
router.post('/api/users/expense/:categoryId',authenticateUser,expensesCltr.create)
router.put('/api/users/update/:id',authenticateUser,expensesCltr.update)
router.delete('/api/expense/delete/:id',authenticateUser,expensesCltr.destroy)


module.exports=router