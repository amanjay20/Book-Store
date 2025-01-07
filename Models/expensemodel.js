import mongoose from 'mongoose'
import User from './UserModel.js'
import _default from 'validator'

const expenseSchema = new mongoose.Schema({
    amount:{
        type:Number,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    description:{
        type:String
    },
    data:{
        type:Date,
        default:Date.now
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:User,
        required:true
    }
})

export default mongoose.model("Expense", expenseSchema)