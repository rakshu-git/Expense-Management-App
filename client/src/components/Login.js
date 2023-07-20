
import React, { useState } from 'react'
import {useDispatch } from 'react-redux'
import { Button, Form, FormGroup, Label, Input, } from 'reactstrap'
import { startAddLoginDetails } from '../actions/register-actions'

const Login=(props)=>{
  
    const[email,setEmail]=useState('')
    const[password,setPassword]=useState('')

    const dispatch = useDispatch()

    const handleSubmit=(e)=>{
        e.preventDefault()
        const formData={
            email,
            password
        }
        dispatch(startAddLoginDetails(formData,props))  
    }
    return(
        <div>
           <h1 className="text-center" style={{color:'green'}}>Please Login to access Dashboard!!</h1>

             <div className="w-50 m-auto">       
            <Form onSubmit={handleSubmit}>
                <FormGroup>
       <Label>Email</Label><br/>
       <Input type='email' value={email} placeholder="enter your email" onChange={(e)=>setEmail(e.target.value)}/>
       </FormGroup>
       <FormGroup>
       <Label>Password</Label><br/>
       <Input type='password' value={password} placeholder="enter your password" onChange={(e)=>setPassword(e.target.value)}/>
       </FormGroup>
       <Button>Submit</Button> 
   </Form> 
        </div>
        </div>
    )
}

export default Login