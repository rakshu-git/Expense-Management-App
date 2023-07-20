import { ADD_CATEGORY } from "../actions/category-actions"
import { ADD_SHOWCATEGORY } from "../actions/category-actions"
const categoryInitialState = {
    data: []
}

const categoryReducer = (state = categoryInitialState, action) => {
    switch(action.type){
        case ADD_CATEGORY : {
            return {...state, data:[...state.data, action.payload]}
        }
        case ADD_SHOWCATEGORY :{
            return {...state,data:action.payload}
        }
        default: {
            return state
        }
    }
}
export default categoryReducer