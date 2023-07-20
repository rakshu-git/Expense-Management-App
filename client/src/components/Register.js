
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Button, Form, FormGroup, Label, Input, } from 'reactstrap'
import { startAddRegisterDetails} from '../actions/register-actions'

const Register = (props) => {

    const [email, setEmail] = useState('rakshu4321@gmail.com')
    const [password, setPassword] = useState('123456789')

    const dispatch = useDispatch()

    const handleSubmit = (e) => {
        e.preventDefault()
        const formData = {
            email,
            password
        }
        console.log(formData)
        dispatch(startAddRegisterDetails(formData))
        
        setEmail('')
        setPassword('')
        props.history.push('/login')
    }
    return (
        <div className="w-50 m-auto" >
            <h1 className="text-center" style={{ color: 'blue' }}>Register with us!!</h1>
            <Form onSubmit={handleSubmit}>

                <FormGroup>
                    <Label style={{ color: 'aqua' }}>Email</Label><br />
                    <Input type='email' value={email} placeholder="enter your email" onChange={(e) => setEmail(e.target.value)} />
                </FormGroup>

                <FormGroup>
                    <Label style={{ color: 'aqua' }}>Password</Label><br />
                    <Input type='password' value={password} placeholder="enter your password" onChange={(e) => setPassword(e.target.value)} />
                </FormGroup>

                <Button>Submit</Button>
            </Form>

        </div>
    )
}

export default Register