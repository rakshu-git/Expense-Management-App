import { ADD_BUDGET } from "../actions/register-actions"
import { ADD_ACCOUNT } from "../actions/register-actions"

const registerInitialState = {
   data:{}
}

const usersReducer = (state = registerInitialState, action) => {
    switch(action.type){
        
        case ADD_ACCOUNT :{
            return {...state,data:action.payload}
        }
        case ADD_BUDGET :{
            return {...state,data:action.payload}
        }
        default: {
            return state
        }
    }
}
export default usersReducer