import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import {Doughnut} from 'react-chartjs-2';
import {library} from '@fortawesome/fontawesome-svg-core'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faShoppingBag, faGasPump, faTicketAlt, faWineGlassAlt, faCoins} from '@fortawesome/free-solid-svg-icons';
import {H4, 
        H5, 
        DollarSign,
        ExpenseDollar, 
        Input, 
        Button, 
        BudgetInfo, 
        Section, 
        ExpenseSplits, 
        ChartContainer,
        ExpenseContainer,
        ShoppingContainer,
        GasContainer,
        TicketContainer,
        GlassContainer,
        CoinsContainer,
        ExpenseButton} from './BudgetStyles';
library.add(faShoppingBag, faGasPump, faTicketAlt, faWineGlassAlt, faCoins)

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
    }, [])

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
                        <H5>Step One: Set Your Budget</H5>
                        <DollarSign>$
                            <Input 
                                value={budget}
                                onChange={e => setBudget(e.target.value)}/>
                        </DollarSign>
                        <Button onClick={incrementStep}>Submit</Button>
                    </div>
                )
            case 2:
                return (
                    <div>
                        <H5>Step Two: Split Your Budget</H5>
                        <BudgetInfo>${(budget - groceries - gas - entertainment - restaurants - other)}</BudgetInfo>
                        <Section>
                            <ExpenseContainer>
                                <ShoppingContainer>
                                    <FontAwesomeIcon icon='shopping-bag' style={{fontSize: '20px', color: '#00E5C5'}}/>
                                </ShoppingContainer>
                                <ExpenseSplits>Groceries</ExpenseSplits>
                            </ExpenseContainer>
                            <ExpenseDollar>$
                            <Input 
                                value={groceries}
                                maxLength='20'
                                onChange={e => setGroceries(e.target.value)}/>
                            </ExpenseDollar>
                        </Section>
                        <Section>
                            <ExpenseContainer>
                                <GasContainer>
                                    <FontAwesomeIcon icon='gas-pump' style={{fontSize: '18px', color: '#00E55B'}}/>
                                </GasContainer>
                                <ExpenseSplits>Gas</ExpenseSplits>
                            </ExpenseContainer>
                            <ExpenseDollar>$
                            <Input 
                                value={gas}
                                maxLength='20'
                                onChange={e => setGas(e.target.value)}/>
                            </ExpenseDollar>
                        </Section>
                        <Section>
                            <ExpenseContainer>
                                <TicketContainer>
                                    <FontAwesomeIcon icon='ticket-alt' style={{fontSize: '18px', color: '#FFAB12'}}/>
                                </TicketContainer>
                                <ExpenseSplits>Entertainment</ExpenseSplits>
                            </ExpenseContainer>
                            <ExpenseDollar>$
                            <Input 
                                value={entertainment}
                                maxLength='20'
                                onChange={e => setEntertainment(e.target.value)}/>
                            </ExpenseDollar>
                        </Section>
                        <Section>
                            <ExpenseContainer>
                                <GlassContainer>
                                    <FontAwesomeIcon icon='wine-glass-alt' style={{fontSize: '18px', color: '#FF247B'}}/>
                                </GlassContainer>
                                <ExpenseSplits>Restaurants</ExpenseSplits>
                            </ExpenseContainer>
                            <ExpenseDollar>$
                            <Input 
                                value={restaurants}
                                maxLength='20'
                                onChange={e => setRestaurants(e.target.value)}/>
                            </ExpenseDollar>
                        </Section>
                        <Section>
                            <ExpenseContainer>
                                <CoinsContainer>
                                    <FontAwesomeIcon icon='coins' style={{fontSize: '18px', color: '#6600E4'}}/>
                                </CoinsContainer>
                                <ExpenseSplits>Other</ExpenseSplits>
                            </ExpenseContainer>
                            <ExpenseDollar>$
                            <Input 
                                value={other}
                                maxLength='20'
                                onChange={e => setOther(e.target.value)}/>
                            </ExpenseDollar>
                        </Section>
                        <ExpenseButton onClick={decrementStep}>Back</ExpenseButton>
                        <Link to='budget'><ExpenseButton onClick={addMonthlyBudget}>Submit</ExpenseButton></Link>
                    </div>
                )
            default:
                return;
        }
    }
    const budgetRemaining = (budget - groceries - gas - entertainment - restaurants - other);
    return (
        <div>
            <H4>Plan your Budget</H4>
            <ChartContainer>
                <Doughnut 
                    height={200}
                    width={200}
                    data={{
                        datasets: [{
                            backgroundColor: ['#46AEFF', '#00E5C5', '#00E55B', '#FFAB12', '#FF247B', '#6600E4'],
                            borderColor: '#000000',
                            data: [parseInt(budgetRemaining), parseInt(groceries), parseInt(gas), parseInt(entertainment), parseInt(restaurants), parseInt(other)]
                        }]    
                    }}
                    options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        cutoutPercentage: 60
                    }} />
            </ChartContainer>
            {showStep()}
        </div>
    )
}

export default BudgetPlanner;