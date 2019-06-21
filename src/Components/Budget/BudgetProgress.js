import React, {useState, useEffect} from 'react';
import axios from 'axios';
import ExpenseModal from './ExpenseModal';
import ChartDisplay from './ChartDisplay/ChartDisplay';
import {H4, ButtonContainer} from './ProgressStyles';
import {library} from '@fortawesome/fontawesome-svg-core'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPlus, faChevronRight, faChevronLeft} from '@fortawesome/free-solid-svg-icons';
library.add(faPlus, faChevronLeft, faChevronRight)

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
    const [budgetIndex, setBudgetIndex] = useState(0)

    useEffect(() => {
        handleSessionUser()
    }, [])

    useEffect(() => {
        handleExpenseTotals()
    }, [expenses])

    const handleSessionUser = () => {
        axios.get('/auth/session-user')
        .then(res => {
            setUser(res.data)
            handleGetUserBudget(res.data.user_id)   
        })
        // .catch(
        //     props.history.push('/')
        // )
    }

    const handleGetUserBudget = async(id) => {
        let today = new Date();
        let mm = today.getMonth()+1;
        let yyyy = today.getFullYear();
        today = mm + '/' + yyyy 
        await axios.get(`/api/monthly-budget/${id}`)
        .then((res) => {
            if(res.data[0].date === today){
                setBudget(res.data[0])
                handleGetUserExpenses(res.data[0].budget_id)
            } else {
                const newBudget = {
                    user_id: res.data[0].user_id,
                    budget: res.data[0].budget,
                    groceries: res.data[0].groceries,
                    gas: res.data[0].gas,
                    entertainment: res.data[0].entertainment,
                    restaurants: res.data[0].restaurants,
                    other: res.data[0].other,
                    date: today
                }
                axios.post('/api/monthly-budget', newBudget)
                .then(res => {
                    setBudget(res.data[0])
                    handleGetUserExpenses(res.data[0].budget_id)
                })
            }
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

    // this is to create functionality that will allow users to go through up to the last 12 months of their budget. Index is stored 
    // on state, and can be incremented through buttons that will be coded into the JSX

    const incrementIndex = () => {
        if(budgetIndex < budget.length - 1){
            setBudgetIndex(budgetIndex + 1)
            handleGetUserExpenses(budgetIndex + 1)
        } else {
            setBudgetIndex(0)
            handleGetUserExpenses(0)
        }
    }

    const decrementIndex = () => {
        if(budgetIndex > 0){
            setBudgetIndex(budgetIndex - 1)
            handleGetUserExpenses(budgetIndex - 1)

        } else {
            setBudgetIndex(budget.length - 1)
            handleGetUserExpenses(budget.length - 1)
        }
    }

    const totalExpenses = (groceriesTotal + gasTotal + entertainmentTotal + restaurantsTotal + otherTotal);
    const budgetRemaining = (budget.budget - groceriesTotal - gasTotal - entertainmentTotal - restaurantsTotal - otherTotal);
    return (
        <div>
            <H4><FontAwesomeIcon icon='chevron-left' onClick={decrementIndex}/>{user.username}'s Progress<FontAwesomeIcon icon='chevron-right' onClick={incrementIndex}/></H4>
            <ChartDisplay 
                budgetRemaining={budgetRemaining}
                totalExpenses={totalExpenses}
                budget={budget}
                groceriesTotal={groceriesTotal}
                gasTotal={gasTotal}
                entertainmentTotal={entertainmentTotal}
                restaurantsTotal={restaurantsTotal}
                otherTotal={otherTotal}/>
            <ButtonContainer>
                <FontAwesomeIcon icon='plus' onClick={handleModalToggle} style={{color: 'white', fontSize: '30px'}}/>
            </ButtonContainer>
            {showModal
            ? <ExpenseModal 
                    budget={budget}
                    toggle={handleModalToggle}
                    expenses={handleGetUserExpenses}/>
            : null}
        </div>
    )
}

export default BudgetProgress;