import { startAddExpenseDetails } from "../actions/expense-actions"
import ExpenseForm from "./ExpenseForm"
import { useDispatch } from "react-redux"
const AddExpense = (props)=>{

const dispatch=useDispatch()
    const submitForm = (data)=>{
        dispatch(startAddExpenseDetails(data))
    }


    return (
        <div>
            <ExpenseForm submitForm={submitForm} />
        </div>
    )
}


export default AddExpense