import React from "react"
import Form from "./Form"
const AddForm=(props)=>{
    const {budget,handleToggle}=props
    
    return(
         <div>
         AddForm
         <Form budget={budget} handleToggle={handleToggle}/>
        </div>
    )
}
export default AddForm