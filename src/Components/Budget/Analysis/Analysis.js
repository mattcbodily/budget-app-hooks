import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import Header from './../../Header/Header'
import LineDisplay from './LineDisplay/LineDisplay'
import Averages from './Averages/Averages'
import {Menu} from './AnalysisStyles'

const Analysis = (props) => {
    const [user, setUser] = useState({})
    const [dates, setDates] = useState([])
    const [allBudget, setAllBudget] = useState([])
    const [groceries, setGroceries] = useState([])
    const [gas, setGas] = useState([])
    const [entertainment, setEntertainment] = useState([])
    const [restaurants, setRestaurants] = useState([])
    const [other, setOther] = useState([])
    const [allExpenses, setAllExpenses] = useState([])
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
        axios.get(`/api/budget-analysis/${id}`)
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
            handleUserExpenses(res.data[0].user_id, dates)
        })
    }

    const handleUserExpenses = (id, dates) => {
        axios.get(`/api/expenses/${id}`)
        .then(res => {
            const separatedAllExpenses = dates.map(element => {
                return res.data.filter(item => {
                    return item.date === element
                })
            })
            const summedAllExpenses = separatedAllExpenses.map(element => {
                return element.reduce((acc, curr) => {
                    return acc + +curr.amount
                }, 0)
            })
            setAllExpenses(summedAllExpenses)
            const separatedGroceryExpenses = dates.map(element => {
                return res.data.filter(item => {
                    return item.date === element && item.category === 'groceries'
                })
            })
            const summedGroceryExpenses = separatedGroceryExpenses.map(element => {
                return element.reduce((acc, curr) => {
                    return acc + +curr.amount
                }, 0)
            })
            setGroceryExpenses(summedGroceryExpenses)
            const separatedGasExpenses = dates.map(element => {
                return res.data.filter(item => {
                    return item.date === element && item.category === 'gas'
                })
            })
            const summedGasExpenses = separatedGasExpenses.map(element => {
                return element.reduce((acc, curr) => {
                    return acc + +curr.amount
                }, 0)
            })
            setGasExpenses(summedGasExpenses)
            const separatedEntertainmentExpenses = dates.map(element => {
                return res.data.filter(item => {
                    return item.date === element && item.category === 'entertainment'
                })
            })
            const summedEntertainmentExpenses = separatedEntertainmentExpenses.map(element => {
                return element.reduce((acc, curr) => {
                    return acc + +curr.amount
                }, 0)
            })
            setEntertainmentExpenses(summedEntertainmentExpenses)
            const separatedRestaurantsExpenses = dates.map(element => {
                return res.data.filter(item => {
                    return item.date === element && item.category === 'restaurants'
                })
            })
            const summedRestaurantsExpenses = separatedRestaurantsExpenses.map(element => {
                return element.reduce((acc, curr) => {
                    return acc + +curr.amount
                }, 0)
            })
            setRestaurantsExpenses(summedRestaurantsExpenses)
            const separatedOtherExpenses = dates.map(element => {
                return res.data.filter(item => {
                    return item.date === element && item.category === 'other'
                })
            })
            const summedOtherExpenses = separatedOtherExpenses.map(element => {
                return element.reduce((acc, curr) => {
                    return acc + +curr.amount
                }, 0)
            })
            setOtherExpenses(summedOtherExpenses)
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
                    <div>
                        <LineDisplay
                            dates={dates} 
                            budget={allBudget}
                            expenses={allExpenses}
                            backgroundColor='#EC6682'
                            borderColor='#EC6682'
                            backgroundColorTwo='#ED254E'
                            borderColorTwo='#ED254E'
                            name='All Budget'
                            incrementStep={incrementStep}
                            decrementStep={decrementStep}/>
                        <Averages 
                            budget={allBudget}
                            expenses={allExpenses}/>
                    </div>
                )
            case 1:
                return (
                    <div>
                        <LineDisplay
                            dates={dates}
                            budget={groceries}
                            expenses={groceryExpenses}
                            backgroundColor='#FF8A8A'
                            borderColor='#FF8A8A'
                            backgroundColorTwo='#DB0000'
                            borderColorTwo='#DB0000'
                            name='Groceries'
                            incrementStep={incrementStep}
                            decrementStep={decrementStep}/>
                        <Averages 
                            budget={groceries}
                            expenses={groceryExpenses}/>
                    </div>
                )
            case 2:
                return (
                    <div>
                        <LineDisplay
                            dates={dates} 
                            budget={gas}
                            expenses={gasExpenses}
                            backgroundColor='#7EC7E6'
                            borderColor='#7EC7E6'
                            backgroundColorTwo='#00A4E7'
                            borderColorTwo='#00A4E7'
                            name='Gas'
                            incrementStep={incrementStep}
                            decrementStep={decrementStep}/>
                        <Averages 
                            budget={gas}
                            expenses={gasExpenses}/>
                    </div>
                )
            case 3:
                return (
                    <div>
                        <LineDisplay
                            dates={dates} 
                            budget={entertainment}
                            expenses={entertainmentExpenses}
                            backgroundColor='#BFE98B'
                            borderColor='#BFE98B'
                            backgroundColorTwo='#82EA00'
                            borderColorTwo='#82EA00'
                            name='Entertainment'
                            incrementStep={incrementStep}
                            decrementStep={decrementStep}/>
                        <Averages 
                            budget={entertainment}
                            expenses={entertainmentExpenses}/>
                    </div>
                )
            case 4:
                return (
                    <div>
                        <LineDisplay 
                            dates={dates}
                            budget={restaurants}
                            expenses={restaurantsExpenses}
                            backgroundColor='#FFE5B0'
                            borderColor='#FFE5B0'
                            backgroundColorTwo='#FFC247'
                            borderColorTwo='#FFC247'
                            name='Restaurants'
                            incrementStep={incrementStep}
                            decrementStep={decrementStep}/>
                        <Averages 
                            budget={restaurants}
                            expenses={restaurantsExpenses}/>
                    </div>
                )
            case 5:
                return (
                    <div>
                        <LineDisplay
                            dates={dates} 
                            budget={other}
                            expenses={otherExpenses}
                            backgroundColor='#D78EFF'
                            borderColor='#D78EFF'
                            backgroundColorTwo='#C55BFF'
                            borderColorTwo='#C55BFF'
                            name='Other'
                            incrementStep={incrementStep}
                            decrementStep={decrementStep}/>
                        <Averages 
                            budget={other}
                            expenses={otherExpenses}/>
                    </div>
                )
            default:
                return
        }
    }

    return(
        <div>
            <Header />
            {displayData()}
            <Menu><Link to='/budget' style={{color: 'black', textDecoration: 'none', fontSize: '18px'}}>Back</Link></Menu>
        </div>
    )
}

export default Analysis;