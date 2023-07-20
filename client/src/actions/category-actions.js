import axios from'axios'
export const ADD_CATEGORY='ADD_CATEGORY'
export const ADD_SHOWCATEGORY='ADD_SHOWCATEGORY'

const setCategoryName=(user)=>{
    return{
         type:ADD_CATEGORY,
         payload:user
    }
}

export const startAddCategoryDetails=(formData)=>{
    console.log('formData',formData)
    return(dispatch)=>{
       axios.post('http://localhost:3781/api/users/create',formData,{
        headers:{'Authorization':localStorage.getItem('token')} 
       })
       .then((response)=>{
        dispatch(setCategoryName(response.data)) 
       })
       .catch((err)=>{
        alert(err.message)
       })
    }
}


const setShowCategory=(user)=>{
    return{
         type:ADD_SHOWCATEGORY,
         payload:user
    }
}
export const startGetCategoryDetails=( )=>{
    return(dispatch)=>{
       axios.get('http://localhost:3781/api/users/show',{
        headers:{'Authorization':localStorage.getItem('token')} 
       })
       .then((response)=>{
        if(response){
            dispatch(setShowCategory(response.data) ) 
        }else{
            alert('error')
        }
       })
       .catch((err)=>{
        alert(err.message)
       })
    }
}

