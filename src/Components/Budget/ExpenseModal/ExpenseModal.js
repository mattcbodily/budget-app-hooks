import React, {useState} from 'react';
import axios from 'axios';
import {Background, Modal, H4, H5, Select, Input, Button} from './ModalStyles';

const ExpenseModal = (props) => {
    const [category, setCategory] = useState('groceries')
    const [expenseName, setExpenseName] = useState('')
    const [expenseAmount, setExpenseAmount] = useState('')

    //this handles adding an expense, by sending down the date
    //in mm/yyyy format, and the sending the information to the
    //backend
    const handleAddExpense = () => {
        let today = new Date();
        let mm = today.getMonth()+1;
        let yyyy = today.getFullYear();
        today = mm + '/' + yyyy;

        let expenseObj = {
            user_id: props.user.user_id,
            budget_id: props.budget.budget_id,
            expense_name: expenseName,
            category: category,
            amount: parseInt(expenseAmount),
            date: props.budget.date
        }
        axios.post('/api/expense', expenseObj)
        .then(res => {
            props.expenses(props.user.user_id);
            props.toggle();
        })
    }

    const handleCategory = (e) => {
        setCategory(e.target.value)
    }

    return(
        <Background>
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
        </Background>
    )
}

export default ExpenseModal;