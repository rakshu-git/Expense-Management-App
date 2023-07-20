import {Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend} from 'chart.js'
import { Bar } from 'react-chartjs-2'
import { useDispatch,useSelector } from 'react-redux'
import React,{useEffect} from 'react'
import { startGetExpenseDetails } from '../actions/expense-actions'
import { startGetCategoryDetails } from '../actions/category-actions'
ChartJS.register(
    BarElement, CategoryScale, LinearScale, Tooltip, Legend
)
const BarChart=(props)=>{

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(startGetExpenseDetails())
        dispatch(startGetCategoryDetails())
    }, [dispatch])

    const expense=useSelector((state)=>{
        return state.expenseDetails.data
      })
      console.log('barchart',expense)
    
      const value=useSelector((state)=>{
        return state.categoryDetails.data
     })
    
    const categoryTotal = {};
    for (const item of expense) {
        const categoryId = item.categoryId;
        const amount = item.amount;
      
        // Check if the category already exists in the categoryTotal object
        if (categoryTotal.hasOwnProperty(categoryId)) {
          // If the category exists, add the amount to the existing total
          categoryTotal[categoryId] += amount;
        } else {
          // If the category doesn't exist, initialize the total with the amount
          categoryTotal[categoryId] = amount;
        }
      }
      
      
   

      const result=value.map((ele)=>{
        const categoryId = ele._id
        const categoryName = ele.categoryName
        if (categoryTotal.hasOwnProperty(categoryId)) {
            const totalAmount = categoryTotal[categoryId];
            return totalAmount
          } else {
             return 0
          }
        
      })
      
      console.log('categoryTotal',result)  



    const data={
        labels:value.map((ele)=>{
            return ele.categoryName
        }),
        datasets:[
           {
            label:'Amount',
            data:result,
            backgroundColor:'red',
            borderColor:'black',
            borderWidth:1
           }  
        ]
    }

    const options ={

    }

    return(
        <div
        style={{
               padding: "10px",
               width:"50%",
               marginTop:"40px"
           }}>
           <Bar    
             data={data}
             options={options}
           ></Bar>
        </div>
    )
}
export default BarChart