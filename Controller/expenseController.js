import Expense from '../Models/expensemodel.js'

//create new expense
export const createExpense = async(req,res)=>{
    const {amount,category,description,date,userId} = req.body
    try {
        const newExpense = await Expense.create({
            amount,
            category,
            description,
            date,
            userId,
        })
        res.status(201).send({
            success:true,
            message:"Expense uploaded successfully",
            newExpense

        })
        
    } catch (error) {
        res.status(500).json({error:err.message})
    }
};

//Get all expenses for a specific  user 
export const getExpense = async(req,res)=>{
    const {userId} = req.query;
    try {
        const expenses = await Expense.find({userId})
        res.status(200).json(expenses)
    } catch (error) {
        res.status(500).json({error:error.message})
    }
};


//Get a single expense by  id 

export const getExpenseById =  async(req,res)=>{
    const {id} = req.params
    try {
        const expense = await Expense.findById(id)
        if(!expense){
            return res.status(404).json({message:"Expense not found"})
        }
        res.status(200).json(expense)
            

    } 
    catch (error) {
        res.status(500).json({error:error.message})
    }
}

//Update an expense by id
export const updateExpense = async (req,res)=>{
    const {id} = req.params
    const {amount,category,description,date} = req.body
    try {
        const updatedExpense = await Expense.findByIdAndUpdate(
            id,
            {amount,category,description,date},
            {new:true,runValidators:true}
        );
        if (!updatedExpense) {
            return res.status(404).json({message:"Expense not found"})
        }
    } catch (error) {
        res.status(500).json({error:error.message})
        
    }
}

//Delete an expense by id
export const deleteExpense = async(req,res)=>{
    const {id} = req.params
    try {
        const deletedExpense = await Expense.findByIdAndDelete(id)
        if (!deletedExpense) {
            return res.status(404).json({message:"Expense not found"})
        }
        res.status(200).json({message:"Expense deleted Successfully"})
    } catch (error) {
        res.status(500).json({error:error.message})
    }
} 