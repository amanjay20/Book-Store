import express from 'express'
import { createExpense, deleteExpense, getExpense, getExpenseById, updateExpense } from '../Controller/expenseController.js'


const router = express.Router()

router.post('/createExpense',createExpense)
router.get('/',getExpense)
router.get('/:id',getExpenseById)
router.put('/:id',updateExpense)
router.delete('/:id',deleteExpense)

export default router