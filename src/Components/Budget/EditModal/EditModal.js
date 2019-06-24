import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Background, Modal, H4, H5, Input, Button} from './EditModalStyles';
import { removeProperties } from '@babel/types';

const EditModal = (props) => {
    // const [budget, setBudget] = useState('')
    const [groceries, setGroceries] = useState('')
    const [gas, setGas] = useState('')
    const [entertainment, setEntertainment] = useState('')
    const [restaurants, setRestaurants] = useState('')
    const [other, setOther] = useState('')

    useEffect(() => {
        budgetNumbers()
    }, [])

    const budgetNumbers = async() => {
        setGroceries(props.budget.groceries)
        setGas(props.budget.gas)
        setEntertainment(props.budget.entertainment)
        setRestaurants(props.budget.restaurants)
        setOther(props.budget.other)
        // setBudget(groceries + gas + entertainment + restaurants + other)
    }

    const budgetTotal = (parseInt(groceries) + parseInt(gas) + parseInt(entertainment) + parseInt(restaurants) + parseInt(other))

    const updateBudget = () => {
        const newBudget = {
            budget: budgetTotal,
            groceries: parseInt(groceries),
            gas: parseInt(gas),
            entertainment: parseInt(entertainment),
            restaurants: parseInt(restaurants),
            other: parseInt(other),
            budget_id: props.budget.budget_id
        }
        axios.put('/api/monthly-budget', newBudget)
        .then(res => {
            props.getBudget(props.user.user_id)
            props.toggle()
        })
        .catch(err => console.log(err))
    }

    return (
        <Background>
            <Modal>
                <H4>Edit Your Budget</H4>
                <H5>${budgetTotal} Remaining</H5>
                <Input 
                    value={groceries}
                    onChange={e => setGroceries(e.target.value)}/>
                <Input 
                    value={gas}
                    onChange={e => setGas(e.target.value)}/>
                <Input 
                    value={entertainment}
                    onChange={e => setEntertainment(e.target.value)}/>
                <Input 
                    value={restaurants}
                    onChange={e => setRestaurants(e.target.value)}/>
                <Input 
                    value={other}
                    onChange={e => setOther(e.target.value)}/>
                <Button onClick={updateBudget}>Submit</Button>
                <Button onClick={props.toggle}>Cancel</Button>
            </Modal>
        </Background>
    )
}

export default EditModal;