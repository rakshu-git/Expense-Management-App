import { ADD_EXPENSE, ADD_EXPENSEDELETE,  ADD_EXPENSESOFT, REMOVE_EXPENSEALL,SET_BUDGETLIMIT,SET_RESTOREALL, UPDATE_EDITEXPENSE ,SET_SORT} from "../actions/expense-actions"
import { ADD_EXPENSEDETAILS } from "../actions/expense-actions"
import { ADD_EXPENSEUNDO } from "../actions/expense-actions"
import { SEARCH_INPUT } from "../actions/expense-actions"

const expenseInitialState = {
    data: [],
    deletedData:[],
    msg:{},
    search : []
}

const expenseReducer = (state = expenseInitialState, action) => {
    switch(action.type){
        case ADD_EXPENSE : {
            return {...state, data:[...state.data, action.payload]}
        }
        case ADD_EXPENSEDETAILS:{
            return {...state,data:action.payload}
        }
        case ADD_EXPENSEDELETE:{
            return {...state,data:[...state.data.filter((ele)=>{
                return ele._id!==action.payload._id
            })],deletedData:[...state.deletedData,action.payload]
            }
        }
        case ADD_EXPENSESOFT:{
            return {...state,deletedData:action.payload}
        }
        case ADD_EXPENSEUNDO:{
            return {...state,deletedData:[...state.deletedData.filter((ele)=>{
                return ele._id !==action.payload._id
            })],data:[...state.data,action.payload]}
        }
        case REMOVE_EXPENSEALL:{
            return {...state,deletedData:[]}
        }
        case SET_RESTOREALL:{
            return {...state,deletedData:[]}
        }
        case UPDATE_EDITEXPENSE : {
            return {...state,data:state.data.map((ele)=>{
                if(ele._id==action.payload._id){
                    return action.payload
                }else{
                    return ele
                }
            })}
        }
        case SET_BUDGETLIMIT : {
            return {...state,msg:action.payload}
        }
        case SEARCH_INPUT : {
            return {...state,search:action.payload}
        }
        case SET_SORT : {
            return {...state,data:action.payload}
        }
        default: {
            return state
        }
    }
}
export default expenseReducer