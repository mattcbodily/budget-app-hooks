import React, {useState, useEffect} from 'react';
import {H4, Average, Over, Under} from './../AnalysisStyles';

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
            <H4>Average Expenses Per Month</H4>
            <Average>${expenses}</Average>
            <H4>Average <Over>Over</Over>/<Under>Under</Under> Budget</H4>
            {(difference > 0)
            ? <Under>${difference}</Under>
            : <Over>${difference}</Over>}
        </div>
    )
}

export default Averages;