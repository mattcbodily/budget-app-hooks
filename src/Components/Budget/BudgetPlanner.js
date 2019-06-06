import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import {Doughnut} from 'react-chartjs-2';

const BudgetPlanner = (props) => {
    const [user, setUser] = useState({})
    const [budget, setBudget] = useState('')
    const [groceries, setGroceries] = useState('')
    const [gas, setGas] = useState('')
    const [entertainment, setEntertainment] = useState('')
    const [restaurants, setRestaurants] = useState('')
    const [other, setOther] = useState('')
    const [step, setStep] = useState(1)

    useEffect(() => {
        handleSessionUser()
    }, [user.id])

    const handleSessionUser = () => {
        axios.get('/auth/session-user')
        .then(res => {
            setUser(res.data)
        })
    }

    const addMonthlyBudget = () => {
        let today = new Date();
        let mm = today.getMonth()+1;
        let yyyy = today.getFullYear();
        today = mm + '/' + yyyy;
        let monthlyBudget = {
            user_id: user.user_id,
            budget: parseInt(budget),
            groceries: parseInt(groceries),
            gas: parseInt(gas),
            entertainment: parseInt(entertainment),
            restaurants: parseInt(restaurants),
            other: parseInt(other),
            date: today
        }
        axios.post('/api/monthly-budget', monthlyBudget)
        .then(res => {

        })
    }

    const decrementStep = () => {
        setStep(step - 1)
    }

    const incrementStep = () => {
        setStep(step + 1)
    }

    const showStep = () => {
        switch(step){
            case 1:
                return (
                    <div>
                        <h5>Step One: Set Your Budget</h5>
                        <input 
                            value={budget}
                            onChange={e => setBudget(e.target.value)}/>
                        <button onClick={incrementStep}>Submit</button>
                    </div>
                )
            case 2:
                return (
                    <div>
                        <h5>Step Two: Split Your Budget</h5>
                        <p>Your budget: ${budget}</p>
                        <p>Budget left: ${(budget - groceries - gas - entertainment - restaurants - other)}</p>
                        <p>Groceries</p>
                        <input 
                            value={groceries}
                            maxLength='20'
                            onChange={e => setGroceries(e.target.value)}/>
                        <p>Gas</p>
                        <input 
                            value={gas}
                            maxLength='20'
                            onChange={e => setGas(e.target.value)}/>
                        <p>Entertainment</p>
                        <input 
                            value={entertainment}
                            maxLength='20'
                            onChange={e => setEntertainment(e.target.value)}/>
                        <p>Restaurants</p>
                        <input 
                            value={restaurants}
                            maxLength='20'
                            onChange={e => setRestaurants(e.target.value)}/>
                        <p>Other</p>
                        <input 
                            value={other}
                            maxLength='20'
                            onChange={e => setOther(e.target.value)}/>
                        <button onClick={decrementStep}>Back</button>
                        <Link to='budget'><button onClick={addMonthlyBudget}>Submit</button></Link>
                    </div>
                )
            default:
                return;
        }
    }
    const budgetRemaining = (budget - groceries - gas - entertainment - restaurants - other);
    return (
        <div>
            <h3>Plan your Budget</h3>
            <div>
                <Doughnut 
                    height={100}
                    width={100}
                    data={{
                        labels: ['Remaining Budget', 'Groceries', 'Gas', 'Entertainment', 'Restaurants', 'Other'],
                        datasets: [{
                            backgroundColor: ['#616161', '#FF4242', '#49D4D6', '#8749D6', '#FFC264', '#2CDE00'],
                            borderColor: '#000000',
                            data: [parseInt(budgetRemaining), parseInt(groceries), parseInt(gas), parseInt(entertainment), parseInt(restaurants), parseInt(other)]
                        }]    
                    }}
                    options={{
                        responsive: true,
                        maintainAspectRatio: false
                    }} />
            </div>
            {showStep()}
        </div>
    )
}

export default BudgetPlanner;