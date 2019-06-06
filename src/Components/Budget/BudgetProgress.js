import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Doughnut} from 'react-chartjs-2';
import ExpenseModal from './ExpenseModal';

const BudgetProgress = (props) => {
    const [user, setUser] = useState({})
    const [budget, setBudget] = useState([])
    const [expenses, setExpenses] = useState([])
    const [groceriesTotal, setGroceriesTotal] = useState(0)
    const [gasTotal, setGasTotal] = useState(0)
    const [entertainmentTotal, setEntertainmentTotal] = useState(0)
    const [restaurantsTotal, setRestaurantsTotal] = useState(0)
    const [otherTotal, setOtherTotal] = useState(0)
    const [showModal, setShowModal] = useState(false)

    useEffect(() => {
        handleSessionUser()
    }, [user.id])

    useEffect(() => {
        handleExpenseTotals()
    }, [expenses])

    const handleSessionUser = async() => {
        axios.get('/auth/session-user')
        .then(res => {
            setUser(res.data)
            handleGetUserBudget(res.data.user_id)
        }) 
    }

    const handleGetUserBudget = async(id) => {
        await axios.get(`/api/monthly-budget/${id}`)
        .then(res => {
            setBudget(res.data[0])
            handleGetUserExpenses(res.data[0].budget_id);
        })
    }

    const handleGetUserExpenses = async(id) => {
        await axios.get(`/api/expenses/${id}`)
        .then((res) => {
            setExpenses(res.data)
        })
    }

    const handleExpenseTotals = () => {
        let groceries = expenses.filter(element => element.category === 'groceries');
        let gas = expenses.filter(element => element.category === 'gas');
        let entertainment = expenses.filter(element => element.category === 'entertainment')
        let restaurants = expenses.filter(element => element.category === 'restaurants')
        let other = expenses.filter(element => element.category === 'other')

        let groceriesTotal = groceries.reduce((acc, curr) => {return acc + +curr.amount}, 0)
        let gasTotal = gas.reduce((acc, curr) => {return acc + +curr.amount}, 0)
        let entertainmentTotal = entertainment.reduce((acc, curr) => {return acc + +curr.amount}, 0)
        let restaurantsTotal = restaurants.reduce((acc, curr) => {return acc + +curr.amount}, 0)
        let otherTotal = other.reduce((acc, curr) => {return acc + +curr.amount}, 0)

        setGroceriesTotal(groceriesTotal)
        setGasTotal(gasTotal)
        setEntertainmentTotal(entertainmentTotal)
        setRestaurantsTotal(restaurantsTotal)
        setOtherTotal(otherTotal)
    }

    const handleModalToggle = () => {
        setShowModal(!showModal)
    }

    const totalExpenses = (groceriesTotal + gasTotal + entertainmentTotal + restaurantsTotal + otherTotal);
    const budgetRemaining = (budget.budget - groceriesTotal - gasTotal - entertainmentTotal - restaurantsTotal - otherTotal);
    
    return (
        <div>
        <button onClick={handleModalToggle}>Add Expense</button>
        {showModal
        ? <ExpenseModal 
                budget={budget}
                toggle={handleModalToggle}
                expenses={handleGetUserExpenses}/>
        : null}
        <div>
            <Doughnut 
                data={{
                    labels: ['Remaining', 'Spent'],
                    datasets: [{
                        label: 'Groceries',
                        backgroundColor: ['#FF4242', '#FFAAAA'],
                        data: [budgetRemaining, totalExpenses]
                    }]
            }}/>
            <Doughnut 
                data={{
                    labels: ['Remaining', 'Spent'],
                    datasets: [{
                        label: 'Groceries',
                        backgroundColor: ['#FF4242', '#FFAAAA'],
                        data: [(budget.groceries - groceriesTotal), groceriesTotal]
                    }]
                }}/>
        </div>
    </div>
    )
}

export default BudgetProgress;