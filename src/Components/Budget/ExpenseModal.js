import React, {useState} from 'react';
import axios from 'axios';
import {Modal, H4, H5, Select, Input, Button} from './ModalStyles';

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
            props.expenses(props.budget.budget_id);
            props.toggle();
        })
    }

    const handleCategory = (e) => {
        setCategory(e.target.value)
    }

    return(
        <Modal>
        <H4>Add an Expense</H4>
        <H5>Expense Category</H5>
        <Select onChange={handleCategory}>
            <option value='groceries'>Groceries</option>
            <option value='gas'>Gas</option>
            <option value='entertainment'>Entertainment</option>
            <option value='restaurants'>Restaurants</option>
            <option value='other'>Other</option>
        </Select>
        <H5>Expense Name</H5>
        <Input 
            value={expenseName}
            maxLength='20'
            onChange={e => setExpenseName(e.target.value)}/>
        <H5>Expense Amount</H5>
        <Input 
            value={expenseAmount}
            maxLength='20'
            onChange={e => setExpenseAmount(e.target.value)}/>
        <Button onClick={handleAddExpense}>Add Expense</Button>
        <Button onClick={props.toggle}>Cancel</Button>
    </Modal>
    )
}

export default ExpenseModal;