import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Header from './../../Header/Header';
import Menu from './../Menu/Menu';
import ChartDisplay from '../ChartDisplay/ChartDisplay';
import LoadingModal from './../LoadingModal/LoadingModal';

const BudgetProgress = (props) => {
    const [user, setUser] = useState({})
    const [budget, setBudget] = useState([])
    const [expenses, setExpenses] = useState([])
    const [budgetIndex, setBudgetIndex] = useState(0)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        handleSessionUser()
    }, [])

    //this function handles switching from the loading animation to the
    //actual view, once the data finishes loading
    const handleLoading = () => {
        setLoading(false)
    }

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

    //this function gets all the budget data from the user, and then checks the date
    //of the most recent budget.  If the the month has changed, a new budget is created
    //with the most recent budgets values
    const handleGetUserBudget = async(id) => {
        let today = new Date();
        let mm = today.getMonth()+1;
        let yyyy = today.getFullYear();
        today = mm + '/' + yyyy 
        await axios.get(`/api/monthly-budget/${id}`)
        .then((res) => {
            if(res.data[0].date === today){
                setBudget(res.data)
                handleGetUserExpenses(res.data[0].user_id)
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
                    setBudget(res.data)
                    handleGetUserExpenses(res.data[0].user_id)
                })
            }
        })
    }

    //this function grabs all of the users expenses for all budgets
    const handleGetUserExpenses = async(id) => {
        await axios.get(`/api/expenses/${id}`)
        .then((res) => {
            setExpenses(res.data)
        })
        handleLoading()
    }

    //display for each budget is handled with a switch statement. These functions 
    //handle the step, and make sure that steps don't go higher than the
    //length of the budget array on state.
    const incrementIndex = () => {
        if(budgetIndex < budget.length - 1){
            setBudgetIndex(budgetIndex + 1)
        } else {
            setBudgetIndex(0)
        }
    }

    const decrementIndex = () => {
        if(budgetIndex > 0){
            setBudgetIndex(budgetIndex - 1)
        } else {
            setBudgetIndex(budget.length - 1)
        }
    }
    
    //This function separates the expenses by category and by budget, and then uses the reduce method
    //to get the total of expenses for that category for that budget
    const budgetList = budget.map((element, i) => {
        let groceries = expenses.filter(element => element.category === 'groceries' && element.budget_id === budget[i].budget_id);
        let gas = expenses.filter(element => element.category === 'gas' && element.budget_id === budget[i].budget_id);
        let entertainment = expenses.filter(element => element.category === 'entertainment' && element.budget_id === budget[i].budget_id)
        let restaurants = expenses.filter(element => element.category === 'restaurants' && element.budget_id === budget[i].budget_id)
        let other = expenses.filter(element => element.category === 'other' && element.budget_id === budget[i].budget_id)

        let groceriesTotal = groceries.reduce((acc, curr) => {return acc + +curr.amount}, 0)
        let gasTotal = gas.reduce((acc, curr) => {return acc + +curr.amount}, 0)
        let entertainmentTotal = entertainment.reduce((acc, curr) => {return acc + +curr.amount}, 0)
        let restaurantsTotal = restaurants.reduce((acc, curr) => {return acc + +curr.amount}, 0)
        let otherTotal = other.reduce((acc, curr) => {return acc + +curr.amount}, 0)
        const totalExpenses = (groceriesTotal + gasTotal + entertainmentTotal + restaurantsTotal + otherTotal);
        const budgetRemaining = (element.budget - groceriesTotal - gasTotal - entertainmentTotal - restaurantsTotal - otherTotal);
        return (
            <div>
                <ChartDisplay
                    key={i}
                    incrementIndex={incrementIndex}
                    decrementIndex={decrementIndex} 
                    budgetRemaining={budgetRemaining}
                    totalExpenses={totalExpenses}
                    budget={budget[i]}
                    groceriesTotal={groceriesTotal}
                    gasTotal={gasTotal}
                    entertainmentTotal={entertainmentTotal}
                    restaurantsTotal={restaurantsTotal}
                    otherTotal={otherTotal} />
            </div>
        )
    })
    
    //this is the switch statement that handles which budget to display, up to 12(for one years worth of budgets)
    const renderBudget = (arr) => {
        switch(budgetIndex){
            case 0:
                return arr[0]
            case 1:
                return arr[1]
            case 2:
                return arr[2]
            case 3:
                return arr[3]
            case 4:
                return arr[4]
            case 5:
                return arr[5]
            case 6:
                return arr[6]
            case 7:
                return arr[7]
            case 8:
                return arr[8]
            case 9:
                return arr[9]
            case 10:
                return arr[10]
            case 11:
                return arr[11]
            default:
                return
        }
    }


    return (
        <div>
            <Header />
            {/* conditional rendering for the loading animation */}
            {loading
            ? <LoadingModal />
            : <div>
                {renderBudget(budgetList)}
              </div>}
            <Menu 
                user={user}
                budget={budget[budgetIndex]}
                getBudget={handleGetUserBudget}
                expenses={handleGetUserExpenses}/>
        </div>
    )
}

export default BudgetProgress;