import PieChart from "./Pie-Chart"
import BarChart from "./BarChart"
import '../styles/account.css'
const Account=(props)=>{
    
    return(
        <div className="chart">
          
          <PieChart/>
          <BarChart style={{marginTop:200}}/>
        </div>
    )
}
export default Account