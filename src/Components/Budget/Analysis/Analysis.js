import React, {useState, useEffect} from 'react';
import axios from 'axios';

const Analysis = (props) => {
    const [user, setUser] = useState({})
    const [budget, setBudget] = useState([])
    const [expenses, setExpenses] = useState([])

    useEffect(() => {
        handleSessionUser()
    }, [])

    const handleSessionUser = () => {
        axios.get('/auth/session-user')
        .then(res => {
            setUser(res.data)
            axios.get(`/api/monthly-budget/${res.data.user_id}`)
            .then(res => {
                setBudget(res.data)
                axios.get(`/api/expenses/${res.data[0].user_id}`)
                .then(res => {
                    setExpenses(res.data)
                })
            })
        })
    }

    console.log(user)
    console.log(budget)
    console.log(expenses)

    return(
        <div>Analysis Component</div>
    )
}

export default Analysis;