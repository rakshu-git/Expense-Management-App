import {Chart as ChartJS, ArcElement, Tooltip, Legend} from 'chart.js'
import { useEffect } from 'react'
import {Pie} from 'react-chartjs-2'
import { useDispatch, useSelector } from 'react-redux'
import { startGetExpenseDetails } from '../actions/expense-actions'
import { startGetLoggedInUser } from '../actions/register-actions'

ChartJS.register(ArcElement, Tooltip, Legend)

const PieChart = (props) => {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(startGetLoggedInUser())
        dispatch(startGetExpenseDetails())
        // dispatch(startGetUser())
        // dispatch(startSetExpense())
    }, [dispatch])

    const users=useSelector((state)=>{
        return state.userDetails.data
       })
     console.log('users',users)
    
    const budget = users.budget

    const expense=useSelector((state)=>{
        return state.expenseDetails.data
      })
      console.log('expense2',expense)
    
    let usedBudget = 0
    for(let i = 0; i < expense.length; i++) {
        usedBudget += expense[i]['amount']
    }

    const remaining = budget - usedBudget


    const data = {
        labels: ['Remaining', 'Used'] ,
        datasets: [
            {
                data: [remaining, usedBudget],
                backgroundColor: ['aqua', 'red']
            }
        ]
    }


    return (
        <div style={{width: '400px'}}>
            <h2> Total Budget - {budget} Rs. </h2>  
            <div >
            <Pie data={data}></Pie>
            </div>
        </div>
    )
}

export default PieChart