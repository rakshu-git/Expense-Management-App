import React, { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { startGetUndoExpenseList } from "../actions/expense-actions"
import { startUndoListDetails } from "../actions/expense-actions"
import { startRemoveAllDetails } from "../actions/expense-actions"
import { startRestoreAllDetails } from "../actions/expense-actions"
import { startGetLoggedInUser } from "../actions/register-actions"
import AddForm from "./AddForm"
import { startGetExpenseDetails } from "../actions/expense-actions"
import "../styles/settings.css"

const Setting = (props) => {

   const [toggle, setToggle] = useState(false)
   // const [value, setValue] = useState(0)

   const dispatch = useDispatch()

   useEffect(() => {
      dispatch(startGetUndoExpenseList())
      dispatch(startGetLoggedInUser())
      dispatch(startGetExpenseDetails())
   }, [])



   const users = useSelector((state) => {
      return state.userDetails.data
   })
   console.log('users', users)


   const expense = useSelector((state) => {
      return state.expenseDetails
   })
   console.log('expense2', expense)

   
      let count = 0
     for (let i = 0; i < expense.data.length; i++) {
         count = count + expense.data[i]['amount']
      }
     
  

   const handleRestore = (id) => {
      dispatch(startUndoListDetails(id))
   }

   const handleDelete = () => {
      dispatch(startRemoveAllDetails())
   }

   const handleRestoreAll = () => {
      dispatch(startRestoreAllDetails())
   }

   const handleToggle = () => {
      const result = !toggle
      setToggle(result)
   }

   return (
      <div className="section">
         <div>
            {toggle ? <div style={{ display: "flex" }}><AddForm handleToggle={handleToggle} budget={users.budget} /><button onClick={handleToggle} className="btn btn-danger" style={{ marginTop:"23px",marginLeft:"10px",height:"40px" }}>Cancel</button></div> : (
               <div>
                  <h2>Total Budget :{users.budget}</h2> <button onClick={handleToggle} className="btn btn-primary">Add</button>
                  <h2>Used Amount :{count} </h2>
                  <h2>Remaining Balance :{users.budget - count} </h2>
               </div>
            )}
         </div>
         <div>
            <h2>Recently deleted Expenses</h2>
            <table className="table table-borderless mb-0" style={{ maxWidth: "600px" }}>
               <thead>
                  <tr>
                     <th>Note</th>
                     <th>Amount</th>
                     <th>Date</th>
                     <th>Restore</th>
                  </tr>
               </thead>
               <tbody>
                  {expense.deletedData.map((ele) => {
                     return (
                        <tr key={ele._id}>
                           <td>{ele.note}</td>
                           <td>{ele.amount}</td>
                           <td>{ele.expenseDate?.split('T')[0]}</td>
                           <td><button onClick={() => { handleRestore(ele._id) }} className="btn btn-primary">Undo</button></td>
                        </tr>
                     )
                  })}
               </tbody>
            </table>
            <button onClick={handleDelete} style={{ marginTop: "20px" }} className="btn btn-danger">Delete All</button>
            <button onClick={handleRestoreAll} style={{ marginLeft: "10px", marginTop: "20px" }} className="btn btn-success">Restore</button>
         </div>

      </div>

   )
}

export default Setting