import React,{useState} from "react"
import { useDispatch } from "react-redux"
import { setUpdateBudgetValue } from "../actions/register-actions"
const Form=(props)=>{
    const {budget:author,handleToggle}=props
    const [budget,setBudget]=useState(author ? author : 0)

    const dispatch=useDispatch()

    const handleSubmit=(e)=>{
        e.preventDefault()
        const formData={
            budget:budget
        }
        dispatch(setUpdateBudgetValue(formData))
        handleToggle()
    }
    return(
        <div>
            <form onSubmit={handleSubmit} className="form-outline mb-4"> 
            <input type="Number" value={budget}  onChange={(e)=>{setBudget(e.target.value)}}/>
            <input type='submit' value='save' className="btn btn-primary" style={{marginLeft:"20px"}}></input>
            </form>
        </div>
    )
}
export default Form