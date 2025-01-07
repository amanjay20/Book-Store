//Package imports
import express from 'express';
import "express-async-errors"
import dotenv from 'dotenv'
import cors from 'cors'
import morgan from 'morgan'

//Files imports
import connectDB from './config/db.js';
// import testjobportal from './Controller/Controller.js';


//routes import
import testRoute from './Routes/testRoute.js'
import authRoutes from './Routes/authRoutes.js'
import expenseRoutes from './Routes/expenseRoutes.js'
import errorMiddleware from './Middleware/errorMiddleware.js';




// DOT ENV Config
dotenv.config()

//MongoDB connection
connectDB()

//rest object
const app = express()

//middlewares
app.use(express.json())
app.use(cors()) //cors is used to establish connection with two app working on different ports like connection between react (xyz) and node (8080) 
app.use(morgan('dev')) // morgan is used to see which api is hit when we use postman to check api output

//routes
app.use("/api/v1/test" , testRoute)
app.use("/api/v1/auth", authRoutes)
app.use("/api/v1/expense", expenseRoutes)


//Validation middleware
app.use(errorMiddleware)



// Port setting from .env or 8080
const PORT = process.env.PORT || 8080

//Created server
app.listen(8080,()=>{
    console.log(`serverjs server is running ${process.env.DEV_MODE} mode on port no ${PORT}`)
})