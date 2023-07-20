import React,{useEffect, useState,useRef} from "react"
import { startAddCategoryDetails } from "../actions/category-actions"
import { useDispatch,useSelector } from "react-redux"
import { startGetCategoryDetails } from "../actions/category-actions"
import { startGetExpenseDetails, startGetSearchInput } from "../actions/expense-actions"
import {startRemoveListDetails } from "../actions/expense-actions"
import { startSortExpense } from "../actions/expense-actions"
import '../styles/dashboard.css'
import EditExpense from "./EditExpense"
import AddExpense from "./AddExpense"

const Dashboard=(props)=>{

 const[toggle,setToggle]=useState(false)
 const[show,setShow]=useState({})
 const [name,setName]=useState('')
 const [searchInput,setSearchInput]=useState('')
 const[select,setSelect]=useState('')

 const search = useRef()
 const dispatch=useDispatch()

 useEffect(()=>{
    search.current.focus()
    dispatch(startGetCategoryDetails())
    dispatch(startGetExpenseDetails())
 },[])

 const value=useSelector((state)=>{
    return state.categoryDetails.data
 })
 console.log('value',value)

 const expense=useSelector((state)=>{
    return state.expenseDetails.data
 })
 console.log('expense2',expense)

 const searchValue=useSelector((state)=>{
    return state.expenseDetails.search
 })
 console.log('searchValue',searchValue)

const handleSubmit=(e)=>{
    e.preventDefault()
    const formData={
        categoryName:name
    }
    console.log(formData)
    dispatch(startAddCategoryDetails(formData))
    setName('') 
}


const handleRemove=(id)=>{
    const input=window.confirm('Are you Sure?')
    if(input){
        dispatch(startRemoveListDetails(id))
        search.current.focus()
    } 
}

const handleEdit=(expense)=>{
    setToggle(!toggle)
    setShow(expense)
}

const handleSearch=(e)=>{
  setSearchInput(e.target.value)
  dispatch(startGetSearchInput(e.target.value,search))
}

// const filteredData=expense.filter((ele)=>{
//     return ele.note.includes(searchInput.toLowerCase())
// })

const handleSort=(e)=>{
    setSelect(e.target.value)
    if(e.target.value.length){ //i got error expense.map is not a function
        dispatch(startSortExpense(e.target.value))
    }
   
}

const sort=['Amount-Low to High','Amount-High to Low','A to Z','Z to A']

return(
    <div >
        {
            toggle && <EditExpense data={show} handleEdit={handleEdit}/>
        }
       <form onSubmit={handleSubmit} className="submit-form">
       <input type='text' value={name} placeholder="Add new Category" onChange={(e)=>{setName(e.target.value)}}/>
       <input type='submit' className="btn btn-success" style={{marginLeft:10}}/>
       </form> 
       <div className="dash"> <div>
           <h2>List of your Expenses - {expense.length}</h2>
           <select value={select} onChange={handleSort}>
                 <option value="">--Select-- </option>
                     {sort.map((ele)=>{
                          return <option key={ele._id} value={ele._id}>{ele}</option>
                          })}  
             </select>
            <br/>
           <input type='text' placeholder="search here" value={searchInput} onChange={handleSearch} ref={search}/>
           <table border='1' className="table table-design">
           <thead className="thead-dark ">
                <tr>
                    <th>Title</th>
                    <th>Amount</th>
                    <th>Date</th>
                    <th>Edit</th>
                    <th>Remove</th>
                </tr>
            </thead>
            <tbody>
                    {             
                       searchValue.data ? searchValue.data.map((ele)=>{
                            return(
                                <tr key={ele._id}>
                                    <td>{ele.note}</td>
                                    <td>{ele.amount}</td>   
                                    <td>{ele.expenseDate?.split('T')[0]}</td>     
                                    <td><button className="btn btn-primary" onClick={()=>{handleEdit(ele)}}>Edit</button></td>           
                                    <td><button className="btn btn-danger" onClick={()=>{handleRemove(ele._id)}}>Remove</button></td>  
                                </tr>
                                 )
                        })
                        :
                        (
                            expense.map((ele)=>{
                                    return(
                                          <tr key={ele._id}>
                                              <td>{ele.note}</td>
                                              <td>{ele.amount}</td>   
                                              <td>{ele.expenseDate?.split('T')[0]}</td>     
                                              <td><button className="btn btn-primary" onClick={()=>{handleEdit(ele)}}>Edit</button></td>           
                                              <td><button className="btn btn-danger" onClick={()=>{handleRemove(ele._id)}}>Remove</button></td>  
                                          </tr>
                                          )
                                })
                        )

                            }
                  
                    
            </tbody>
                
           </table>
       </div>  
          <AddExpense/>
       </div>  
    </div>
)
  
}

export default Dashboard