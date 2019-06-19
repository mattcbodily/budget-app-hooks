import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Doughnut} from 'react-chartjs-2';
import ExpenseModal from './ExpenseModal';
import {H4, H6, ChartsContainer, ChartsWrapper, ButtonContainer, BudgetNumber, GroceryNumber, GasNumber, ENumber, RestaurantsNumber, OtherNumber} from './ProgressStyles';
import {library} from '@fortawesome/fontawesome-svg-core'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPlus} from '@fortawesome/free-solid-svg-icons';
library.add(faPlus)

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

    const handleSessionUser = () => {
        axios.get('/auth/session-user')
        .then(res => {
            setUser(res.data)
            handleGetUserBudget(res.data.user_id)   
        })
        .catch(
            props.history.push('/')
        )
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

    const totalExpenses = (groceriesTotal + gasTotal + entertainmentTotal + restaurantsTotal + otherTotal);
    const budgetRemaining = (budget.budget - groceriesTotal - gasTotal - entertainmentTotal - restaurantsTotal - otherTotal);
    return (
        <div>
            <H4>{user.username}'s Progress</H4>
            <ChartsContainer>
                <ChartsWrapper>
                    <H6>All Budget</H6>
                    <BudgetNumber>${budgetRemaining}</BudgetNumber>
                    <Doughnut 
                        height={100}
                        width={100}
                        data={{
                            datasets: [{
                                label: 'Budget',
                                backgroundColor: ['#FF4242', '#FFAAAA'],
                                data: [budgetRemaining, totalExpenses]
                            }]
                        }}
                        options={{
                            responsive: true,
                            maintainAspectRatio: false,
                            cutoutPercentage: 60
                    }}/>
                </ChartsWrapper>
                <ChartsWrapper>
                    <H6>Groceries</H6>
                    <GroceryNumber>${budget.groceries - groceriesTotal}</GroceryNumber>
                    <Doughnut
                        height={1}
                        width={1} 
                        data={{
                            datasets: [{
                                label: 'Groceries',
                                backgroundColor: ['#FF8A8A', '#DB0000'],
                                data: [(budget.groceries - groceriesTotal), groceriesTotal]
                            }]
                        }}
                        options={{
                            responsive: true,
                            maintainAspectRatio: false,
                            cutoutPercentage: 60
                    }}/>
                </ChartsWrapper>
                <ChartsWrapper>
                    <H6>Gas</H6>
                    <GasNumber>${budget.gas - gasTotal}</GasNumber>
                    <Doughnut
                        height={1}
                        width={1} 
                        data={{
                            datasets: [{
                                label: 'Gas',
                                backgroundColor: ['#7EC7E6', '#00A4E7'],
                                data: [(budget.gas - gasTotal), gasTotal]
                            }]
                        }}
                        options={{
                            responsive: true,
                            maintainAspectRatio: false,
                            cutoutPercentage: 60
                    }}/>
                </ChartsWrapper>
                <ChartsWrapper>
                    <H6>Entertainment</H6>
                    <ENumber>${budget.entertainment - entertainmentTotal}</ENumber>
                    <Doughnut
                        height={1}
                        width={1} 
                        data={{
                            datasets: [{
                                label: 'Entertainment',
                                backgroundColor: ['#BFE98B', '#82EA00'],
                                data: [(budget.entertainment - entertainmentTotal), entertainmentTotal]
                            }]
                        }}
                        options={{
                            responsive: true,
                            maintainAspectRatio: false,
                            cutoutPercentage: 60
                    }}/>
                </ChartsWrapper>
                <ChartsWrapper>
                    <H6>Restaurants</H6>
                    <RestaurantsNumber>${budget.restaurants - restaurantsTotal}</RestaurantsNumber>
                    <Doughnut
                        height={1}
                        width={1} 
                        data={{
                            datasets: [{
                                label: 'Restaurants',
                                backgroundColor: ['#FFE5B0', '#FFC247'],
                                data: [(budget.restaurants - restaurantsTotal), restaurantsTotal]
                            }]
                        }}
                        options={{
                            responsive: true,
                            maintainAspectRatio: false,
                            cutoutPercentage: 60
                    }}/>
                </ChartsWrapper>
                <ChartsWrapper>
                    <H6>Other</H6>
                    <OtherNumber>${budget.other - otherTotal}</OtherNumber>
                    <Doughnut
                        height={1}
                        width={1} 
                        data={{
                            datasets: [{
                                label: 'Other',
                                backgroundColor: ['#E3B0FF', '#C55BFF'],
                                data: [(budget.other - otherTotal), otherTotal]
                            }]
                        }}
                        options={{
                            responsive: true,
                            maintainAspectRatio: false,
                            cutoutPercentage: 60
                    }}/>
                </ChartsWrapper>
            </ChartsContainer>
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