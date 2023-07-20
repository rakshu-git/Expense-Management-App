import React from "react";
import { Link,Route,withRouter} from "react-router-dom"
import Register from "./components/Register"
import {useState,useEffect} from "react";
import Login from "./components/Login"
import Home from "./components/Home";
import Dashboard from "./components/Dashboard";
import Setting from "./components/Settings";
import Account from "./components/Account";
import './styles/app.css'
import Swal from "sweetalert2";


function App(props) {

  const handleClick=()=>{
    Swal.fire({
      title: 'Are you sure?',
      text: "Your session will be terminated!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'LogOut!'
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem('token')
        props.history.push('/')
        Swal.fire(
          'Logged Out!',
          'Successfully you have been logged out.',
          'success'
        )
      }
    })
  }

  return (
    <div className="container">
      { localStorage.getItem('token')? 
       (
        <div >
          <h1>Expense-App</h1>
          <nav className="nav navbar navbar-expand-lg navbar-light bg-light">
          <Link className="nav-link" to='/settings' >Setting</Link>
          <Link className="nav-link" to='/dashboard' >Dashboard</Link>
          <Link className="nav-link" to='/login' onClick={handleClick}> Logout </Link>
          <Link  className="nav-link" to='/account' >Account</Link>                 
          </nav> 
        </div>
      ):(
        <div>
          <h1>Expense-App</h1>
          <nav className="nav navbar navbar-expand-lg navbar-light bg-light">
          <Link className="nav-link"to='/'>Home</Link>
          <Link className="nav-link"  to='/register'>Register</Link>
          <Link className="nav-link" to='/login'>Login</Link>
          </nav>
        </div>
      )
       }
      <div>
      
    
     
      <Route path='/' component={Home} exact={true}/>
      <Route path='/register' component={Register} exact={true}/>
      <Route path='/login' component={Login} exact={true}/>
      <Route path='/settings' component={Setting} exact={true}/>
      <Route path='/dashboard' component={Dashboard} exact={true}/>
      <Route path='/account' component={Account} exact={true}/>
    </div>
    </div>
   
  )
}

export default withRouter(App);
