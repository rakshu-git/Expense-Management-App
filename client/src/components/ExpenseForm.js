import {useState,useEffect} from "react"
import {useSelector,useDispatch } from "react-redux"
import { startGetCategoryDetails } from "../actions/category-actions"
import { startBudgetAvailability } from "../actions/expense-actions"

const ExpenseForm=(props)=>{
    const {submitForm, note:n,amount:a,expenseDate:d,categoryId:c}=props
    const [note,setNote]=useState(n ? n : '')
    const [date,setDate]=useState(d ? d.split('T')[0] : '')
    const [number,setNumber]=useState(a ? a : 0)   
    const [select,setSelect]=useState(c ? c : '')
    
    const dispatch=useDispatch()

    useEffect(()=>{
      dispatch(startGetCategoryDetails())
      
    },[])

    const value=useSelector((state)=>{
        return state.categoryDetails.data
     })
     console.log('value',value)

     const budgetmsg=useSelector((state)=>{
        return state.expenseDetails.msg
     })
     console.log('msg',budgetmsg)

     const handleSubmission=(e)=>{
        e.preventDefault()
        const formData={
            note:note,
            expenseDate:date,
            categoryId:select,
            amount:number
        }
        submitForm(formData)
        setNote('')
        setDate('')
        setSelect('')
        setNumber(0)
    }

    const handleChange=(e)=>{
        setNumber(e.target.value)
        const formData={
            amount:e.target.value
        }
        dispatch(startBudgetAvailability(formData))
    }

    return(
        <div>
        <h1>Add or Update your Expense</h1>
            <form onSubmit={handleSubmission} className="form form-design">
                 
 
                 <label>Note</label>
                 <br/>
                 <input type='text' value={note} placeholder="Enter the Note" onChange={(e)=>{setNote(e.target.value)}}/>
                 <br/>
 
                 <label>Date</label>
                 <br/>
                 <input type='date' value={date} onChange={(e)=>{setDate(e.target.value)}}/>
                 <br/>
 
                 <label>Category</label>
                 <br/>
                 <select value={select} onChange={(e)=>{setSelect(e.target.value)}}>
                 <option value="">--Please choose a category-- </option>
                     {value.map((ele)=>{
                          return <option key={ele._id} value={ele._id}>{ele.categoryName}</option>
                          })}  
                 </select>
                 <br/>
 
                 <label>Amount</label>
                 <br/>
                 <input type='number' value={number} onChange={handleChange}/>
                 <br/>
                 <br/>
                 <div>
                    {budgetmsg?.message ?(
                        <div>
                            <span style={{color:'green'}}>{budgetmsg.message}</span>
                            <br/>
                             <input type='submit' className="btn btn-success"/>
                        </div>
                    ):(
                        <div>
                               <span style={{color:'red'}}>{budgetmsg.error}</span>
                               <br/>
                               <input type='submit' className="btn btn-success" disabled/>
                        </div>
                    )}
                 
                 </div>
            </form>
        </div>
       
    )
}

export default ExpenseForm





















