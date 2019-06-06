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

    console.log(user)
    return (
        <div>

        </div>
    )
}

export default BudgetPlanner;