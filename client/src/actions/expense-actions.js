import axios from "axios"
export const ADD_EXPENSE='ADD_EXPENSE'
export const ADD_EXPENSEDETAILS='ADD_EXPENSEDETAILS'
export const ADD_EXPENSEDELETE = 'ADD_EXPENSEDELETE'
export const ADD_EXPENSESOFT='ADD_EXPENSESOFT'  
export const ADD_EXPENSEUNDO='ADD_EXPENSEUNDO'
export const REMOVE_EXPENSEALL='REMOVE_EXPENSEALL'
export const SET_RESTOREALL='SET_RESTOREALL'
export const ADD_EXPENSEEDIT='ADD_EXPENSEEDIT'
export const SET_BUDGETLIMIT='SET_BUDGETLIMIT'
export const UPDATE_EDITEXPENSE='UPDATE_EDITEXPENSE'
export const SEARCH_INPUT='SEARCH_INPUT'
export const SET_SORT='SET_SORT'

const setAddExpense=(user)=>{
    return{
         type:ADD_EXPENSE,
         payload:user
    }
}

export const startAddExpenseDetails=(formData)=>{
    console.log('formAction',formData)
    return(dispatch)=>{
       axios.post(`http://localhost:3781/api/users/expense/${formData.categoryId}`,formData,{
        headers:{'Authorization':localStorage.getItem('token')} 
       })
       .then((response)=>{
        
        console.log('formAction2',response.data)
         dispatch(setAddExpense(response.data) ) 

       })
       .catch((err)=>{
        alert(err.message)
       })
    }
}


const setExpenseDetails=(user)=>{
    return{
         type:ADD_EXPENSEDETAILS,
         payload:user
    }
}

export const startGetExpenseDetails=( )=>{
    return(dispatch)=>{
       axios.get('http://localhost:3781/api/users/list',{
        headers:{'Authorization':localStorage.getItem('token')} 
       })
       .then((response)=>{
        if(!response.data?.errors){
            dispatch(setExpenseDetails(response.data)) 
        }else{
            alert(response.data.errors)
        }
       })
       .catch((err)=>{
        alert(err.message)
       })
    }
}

const setExpenseUndoList=(user)=>{
    return{
        type:ADD_EXPENSESOFT,
        payload:user
    }
}

export const startGetUndoExpenseList=( )=>{
    return(dispatch)=>{
       axios.get('http://localhost:3781/api/expense/undolist',{
        headers:{'Authorization':localStorage.getItem('token')} 
       })
       .then((response)=>{
        if(!response.data?.errors){ 
            dispatch(setExpenseUndoList(response.data))
        }else{
            alert(response.data.errors)
        }
       })
       .catch((err)=>{
        alert(err.message)
       })
    }
}


const setDeleteExpense=(user)=>{
    return{
         type:ADD_EXPENSEDELETE,
         payload:user
    }
}


export const startRemoveListDetails=(id)=>{
    
    return(dispatch)=>{
       axios.delete(`http://localhost:3781/api/expense/delete/${id}?type=delete`,{
        headers:{'Authorization':localStorage.getItem('token')} 
       })
       .then((response)=>{
         console.log('response',response)
         if(!response.data?.errors){
            dispatch(setDeleteExpense(response.data))     
        }else{
            alert(response.data.errors)
        }
       })
       .catch((err)=>{
        alert(err.message)
       })
    }
}


const setUndoExpense=(user)=>{
    return{
         type:ADD_EXPENSEUNDO,
         payload:user
    }
}


export const startUndoListDetails=(id)=>{
    
    return(dispatch)=>{
       axios.delete(`http://localhost:3781/api/expense/delete/${id}?type=undo`,{
        headers:{'Authorization':localStorage.getItem('token')} 
       })
       .then((response)=>{
        console.log('undo',response.data)
         if(!response.data?.errors){
            dispatch(setUndoExpense(response.data))     
        }else{
            alert(response.data.errors)
        }
       })
       .catch((err)=>{
        alert(err.message)
       })
    }
}

const setRemoveAllExpense=(user)=>{
    return{
         type:REMOVE_EXPENSEALL,
         payload:user
    }
}
export const startRemoveAllDetails=()=>{
    
    return(dispatch)=>{
       axios.delete(`http://localhost:3781/api/expense/deleteAll?type=deletePermanently`,{
        headers:{'Authorization':localStorage.getItem('token')} 
       })
       .then((response)=>{
         if(!response.data?.errors){
            dispatch(setRemoveAllExpense(response.data))     
        }else{
            alert(response.data.errors) 
        }
       })
       .catch((err)=>{
        alert(err.message)
       })
    }
}


const setRestoreAll=(user)=>{
    return{
         type:SET_RESTOREALL,
         payload:user
    }
}
export const startRestoreAllDetails=()=>{   
    return(dispatch)=>{
       axios.delete(`http://localhost:3781/api/expense/deleteAll?type=restore`,{
        headers:{'Authorization':localStorage.getItem('token')} 
       })
       .then((response)=>{    
        console.log('restore button',response.data) 
        dispatch(setRestoreAll(response.data)) 
        dispatch(startGetExpenseDetails())              
       })
       .catch((err)=>{
        alert(err.message)
       })
    }
}




const setEditExpense=(user)=>{
    return{
         type:UPDATE_EDITEXPENSE,
         payload:user
       
    }
}

export const startEditAllDetails= (formData,handleEdit,id)=>{
    return async (dispatch)=>{
        try{
            const expense=await axios.put(`http://localhost:3781/api/users/update/${id}`,formData,{
                headers:{'Authorization':localStorage.getItem('token')} 
            })
            console.log('editexpense',expense.data)
            dispatch(setEditExpense(expense.data))
            handleEdit()
           }catch(error){
            alert(error)
          }
       
        }
}

const setBudgetLimit=(user)=>{
    return{
         type:SET_BUDGETLIMIT,
         payload:user
       
    }
}

export const startBudgetAvailability=(formData)=>{
    return async (dispatch)=>{
        try{
            const budgetLimit=await axios.post('http://localhost:3781/api/expense/budgetLimit',formData,{
                headers:{'Authorization':localStorage.getItem('token')}  
            })
            console.log('budgetLimit',budgetLimit)
            dispatch(setBudgetLimit(budgetLimit.data))
        }catch(e){
            alert(e)
        }
    }
}


const setSearchInput=(user)=>{
    return{
         type:SEARCH_INPUT,
         payload:user
       
    }
}

export const startGetSearchInput=(data,search)=>{
    return async (dispatch)=>{
        try{
            const searchInput=await axios.get(`http://localhost:3781/api/expense/search?text=${data}`,{
                headers:{'Authorization':localStorage.getItem('token')}  
            })
            console.log('searchAction',searchInput)
            dispatch(setSearchInput(searchInput))
            // search.current.focus() 
        }catch(e){
            alert(e)
        }
    }
}

const setSortExpense=(expense)=>{
    return{
        type:'SET_SORT',
        payload:expense
    }
}
export const startSortExpense = (method) => {
    return async (dispatch) => {
        try {
            const expense = await axios.get(`http://localhost:3781/api/expense/sort?type=${method}`, {
                headers: {
                    'Authorization': localStorage.getItem('token')
                }
            })
            dispatch(setSortExpense(expense.data))
        } catch (error) {
           alert(error) 
        }
    }
}