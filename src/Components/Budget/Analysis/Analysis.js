import React, {useState, useEffect} from 'react';
import axios from 'axios';
import LineDisplay from './LineDisplay/LineDisplay';

const Analysis = (props) => {
    const [user, setUser] = useState({})
    const [expenses, setExpenses] = useState([])
    const [dates, setDates] = useState([])
    const [allBudget, setAllBudget] = useState([])
    const [groceries, setGroceries] = useState([])
    const [gas, setGas] = useState([])
    const [entertainment, setEntertainment] = useState([])
    const [restaurants, setRestaurants] = useState([])
    const [other, setOther] = useState([])
    const [groceryExpenses, setGroceryExpenses] = useState([])
    const [gasExpenses, setGasExpenses] = useState([])
    const [entertainmentExpenses, setEntertainmentExpenses] = useState([])
    const [restaurantsExpenses, setRestaurantsExpenses] = useState([])
    const [otherExpenses, setOtherExpenses] = useState([])
    const [step, setStep] = useState(0)

    useEffect(() => {
        handleSessionUser()
    }, [])

    const handleSessionUser = () => {
        axios.get('/auth/session-user')
        .then(res => {
            setUser(res.data)
            handleUserBudget(res.data.user_id)
        })
    }

    const handleUserBudget = (id) => {
        axios.get(`/api/monthly-budget/${id}`)
        .then(res => {
            const dates = res.data.map(element => element.date)
            const allBudget = res.data.map(element => element.budget)
            const groceries = res.data.map(element => element.groceries)
            const gas = res.data.map(element => element.gas)
            const entertainment = res.data.map(element => element.entertainment)
            const restaurants = res.data.map(element => element.restaurants)
            const other = res.data.map(element => element.other)
            setDates(dates)
            setAllBudget(allBudget)
            setGroceries(groceries)
            setGas(gas)
            setEntertainment(entertainment)
            setRestaurants(restaurants)
            setOther(other)
            handleUserExpenses(res.data[0].user_id)
        })
    }

    const handleUserExpenses = (id) => {
        axios.get(`/api/expenses/${id}`)
        .then(res => {
            setExpenses(res.data)
        })
    }

    const incrementStep = () => {
        if(step < 5){
            setStep(step + 1)
        } else {
            setStep(0)
        }
    }

    const decrementStep = () => {
        if(step > 0){
            setStep(step - 1)
        } else {
            setStep(5)
        }
    }
    
    const displayData = () => {
        switch(step){
            case 0:
                return (
                    <LineDisplay
                        dates={dates} 
                        budget={allBudget}
                        backgroundColor='#F1F1F1'
                        borderColor='#F1F1F1'
                        name='All Budget'
                        incrementStep={incrementStep}
                        decrementStep={decrementStep}/>
                )
            case 1:
                return (
                    <LineDisplay
                        dates={dates}
                        budget={groceries}
                        backgroundColor='#DB0000'
                        borderColor='#DB0000'
                        name='Groceries'
                        incrementStep={incrementStep}
                        decrementStep={decrementStep}/>
                )
            case 2:
                return (
                    <LineDisplay
                        dates={dates} 
                        budget={gas}
                        backgroundColor='#00A4E7'
                        borderColor='#00A4E7'
                        name='Gas'
                        incrementStep={incrementStep}
                        decrementStep={decrementStep}/>
                )
            case 3:
                return (
                    <LineDisplay
                        dates={dates} 
                        budget={entertainment}
                        backgroundColor='#82EA00'
                        borderColor='#82EA00'
                        name='Entertainment'
                        incrementStep={incrementStep}
                        decrementStep={decrementStep}/>
                )
            case 4:
                return (
                    <LineDisplay 
                        dates={dates}
                        budget={restaurants}
                        backgroundColor='#FFC247'
                        borderColor='#FFC247'
                        name='Restaurants'
                        incrementStep={incrementStep}
                        decrementStep={decrementStep}/>
                )
            case 5:
                return (
                    <LineDisplay
                        dates={dates} 
                        budget={other}
                        backgroundColor='#C55BFF'
                        borderColor='#C55BFF'
                        name='Other'
                        incrementStep={incrementStep}
                        decrementStep={decrementStep}/>
                )
            default:
                return
        }
    }

    return(
        <div>
            {displayData()}
        </div>
    )
}

export default Analysis;