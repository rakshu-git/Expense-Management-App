import ExpenseForm from "./ExpenseForm"
import { useDispatch } from "react-redux"
import { startEditAllDetails } from "../actions/expense-actions"
const EditExpense=(props)=>{

    const{data,handleEdit}=props

    const dispatch=useDispatch()

    const submitForm=async (formData)=>{
        dispatch(startEditAllDetails(formData,handleEdit,data._id)) 
    }
        
    return(
    <div>
       <ExpenseForm submitForm={submitForm} {...data}/>
    </div>
    )
}
export default EditExpense