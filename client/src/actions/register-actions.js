import axios from'axios'
import Swal from 'sweetalert2'

export const ADD_ACCOUNT='ADD_ACCOUNT'
export const ADD_USERDETAILS='ADD_USERDETAILS'
export const ADD_BUDGET='ADD_BUDGET'


const setUserDetails=(user)=>{
    return{
         type:ADD_USERDETAILS,
         payload:user
    }
}

export const startAddRegisterDetails=(formData)=>{
    console.log('formData',formData)
    return(dispatch)=>{
       axios.post('http://localhost:3781/api/users/register',formData)
       .then((response)=>{
        console.log('response',response)
        dispatch(setUserDetails(response.data))
       })
       .catch((err)=>{
        alert(err.message)
       })
    }
}


export const startAddLoginDetails=(formData,props)=>{
    return(dispatch)=>{
        axios.post('http://localhost:3781/api/users/login',formData)
        .then((response)=>{
         console.log('response',response.data)
         if(!response.data?.errors){
         localStorage.setItem('token',response.data)
         props.history.push('/dashboard')
         Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Successfully Logged In',
            showConfirmButton: false,
            timer: 1500
          })
         }else{
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Invalid Email / Password!',   
              })
            
         }
       
         
        })
        .catch((err)=>{
         alert(err.message)
        })
     }
}

const setLoggedInUser=(user)=>{
    return{
         type:ADD_ACCOUNT,
        payload:user
    }
}

export const startGetLoggedInUser=()=>{
    return(dispatch)=>{
        (async()=>{
            try{
                const user=await axios.get('http://localhost:3781/api/users/account',{
                    headers:{'Authorization':localStorage.getItem('token')}
                })
                console.log('user',user)
                dispatch(setLoggedInUser(user.data))
        }catch(e){
            alert(e)
        }
        })()
    
    }     
}

const setBudgetUpdate=(user)=>{
    return{
         type:ADD_BUDGET,
         payload:user
    }
}

export const setUpdateBudgetValue=(formData)=>{
    return(dispatch)=>{
        (async()=>{
            try{
                const user=await axios.put('http://localhost:3781/api/users/budget/update',formData,{
                    headers:{'Authorization':localStorage.getItem('token')}
                })
                console.log('user',user)
                dispatch(setBudgetUpdate(user.data))
        }catch(e){
            alert(e)
        }
        })()
    }
}
