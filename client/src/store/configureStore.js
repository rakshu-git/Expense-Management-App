import { createStore, combineReducers, applyMiddleware } from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import usersReducer from '../reducers/register-reducer'
import categoryReducer from '../reducers/category-reducer'
import expenseReducer from '../reducers/expense-reducer'
const configureStore = () => {
  const store = createStore(combineReducers({
    userDetails: usersReducer,
    categoryDetails:categoryReducer,
    expenseDetails:expenseReducer
  }), composeWithDevTools(applyMiddleware(thunk)))
  return store
}
export default configureStore