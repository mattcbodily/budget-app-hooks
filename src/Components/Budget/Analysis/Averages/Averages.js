import React, {useState, useEffect} from 'react';

const Averages = (props) => {
    const [difference, setDifference] = useState(0)
    const [expenses, setExpenses] = useState(0)

    useEffect(() => {
        averageExpenses()
    }, [props.expenses])

    useEffect(() => {
        overUnder()
    }, [props.budget, props.expenses])
    
    const averageExpenses = () => {
        let summedExpenses = props.expenses.reduce((acc, curr) => {
            return acc + curr
        }, 0)
        setExpenses(+(summedExpenses / props.expenses.length).toFixed(2))
    }

    const overUnder = () => {
        let differences = props.budget.map((element, i) => {
            return element - props.expenses[i]
        })
        let overUnder = differences.reduce((acc, curr) => {
            return acc + curr
        }, 0)
        setDifference(+(overUnder / props.budget.length).toFixed(2))
    }

    return (
        <div>
            <h4>${expenses}</h4>
            <h4>${difference}</h4>
        </div>
    )
}

export default Averages;