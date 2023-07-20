const express=require('express')
const cors=require('cors')
const configureDB = require('./config/database')
const router=require('./config/routes')

const app=express()
const PORT=3781

configureDB()
app.use(cors())
app.use(express.json())
app.use(router)

app.listen(PORT,()=>{
  console.log('server running on port',PORT)
})