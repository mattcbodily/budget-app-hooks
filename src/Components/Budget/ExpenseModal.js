import React, {useState} from 'react';
import axios from 'axios';

const ExpenseModal = (props) => {
    const [category, setCategory] = useState('groceries')
    const [expenseName, setExpenseName] = useState('')
    const [expenseAmount, setExpenseAmount] = useState('')

    const handleAddExpense = () => {
        let today = new Date();
        let dd = today.getDate();
        let mm = today.getMonth()+1;
        let yyyy = today.getFullYear();
        today = mm + '/' + dd + '/' + yyyy;

        let expenseObj = {
            budget_id: props.budget.budget_id,
            expense_name: expenseName,
            category: category,
            amount: parseInt(expenseAmount),
            date: today
        }
        axios.post('/api/expense', expenseObj)
        .then(res => {
            props.expenses();
            props.toggle();
        })
    }

    const handleCategory = (e) => {
        setCategory(e.target.value)
    }

    return(
        <div>
        <h3>Add an Expense</h3>
        <h5>Expense Category</h5>
        <select onChange={handleCategory}>
            <option value='groceries'>Groceries</option>
            <option value='gas'>Gas</option>
            <option value='entertainment'>Entertainment</option>
            <option value='restaurants'>Restaurants</option>
            <option value='other'>Other</option>
        </select>
        <h5>Expense Name</h5>
        <input 
            value={expenseName}
            maxLength='20'
            onChange={e => setExpenseName(e.target.value)}/>
        <h5>Expense Amount</h5>
        <input 
            value={expenseAmount}
            maxLength='20'
            onChange={e => setExpenseAmount(e.target.value)}/>
        <button onClick={handleAddExpense}>Add Expense</button>
    </div>
    )
}

export default ExpenseModal;