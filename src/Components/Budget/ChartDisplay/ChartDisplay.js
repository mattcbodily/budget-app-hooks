import React from 'react';
import {Doughnut} from 'react-chartjs-2';
import {H4, H6, ChartsContainer, ChartsWrapper, BudgetNumber} from '../BudgetProgress/ProgressStyles';
import {library} from '@fortawesome/fontawesome-svg-core'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faChevronRight, faChevronLeft} from '@fortawesome/free-solid-svg-icons';
library.add(faChevronLeft, faChevronRight)

const ChartDisplay = (props) => {
    return(
        <div>
            <H4><FontAwesomeIcon icon='chevron-left' onClick={props.incrementIndex} style={{fontSize: '19px', marginRight: '5px'}}/>Your Budget: {props.budget.date}<FontAwesomeIcon icon='chevron-right' onClick={props.decrementIndex} style={{fontSize: '19px', marginLeft: '5px'}}/></H4>
            <ChartsContainer>
                <ChartsWrapper>
                    <H6>All Budget</H6>
                    <BudgetNumber>${props.budgetRemaining}</BudgetNumber>
                    <Doughnut 
                        height={100}
                        width={100}
                        data={{
                            datasets: [{
                                label: 'Budget',
                                backgroundColor: ['#EC6682', '#ED254E'],
                                borderColor: '#F2F2F2',
                                data: [props.budgetRemaining, props.totalExpenses]
                            }]
                        }}
                        options={{
                            responsive: true,
                            maintainAspectRatio: false,
                            cutoutPercentage: 60
                    }}/>
                </ChartsWrapper>
                <ChartsWrapper>
                    <H6>Groceries</H6>
                    <BudgetNumber>${props.budget.groceries - props.groceriesTotal}</BudgetNumber>
                    <Doughnut
                        height={1}
                        width={1} 
                        data={{
                            datasets: [{
                                label: 'Groceries',
                                backgroundColor: ['#FF8A8A', '#DB0000'],
                                borderColor: '#F2F2F2',
                                data: [(props.budget.groceries - props.groceriesTotal), props.groceriesTotal]
                            }]
                        }}
                        options={{
                            responsive: true,
                            maintainAspectRatio: false,
                            cutoutPercentage: 60
                    }}/>
                </ChartsWrapper>
                <ChartsWrapper>
                    <H6>Gas</H6>
                    <BudgetNumber>${props.budget.gas - props.gasTotal}</BudgetNumber>
                    <Doughnut
                        height={1}
                        width={1} 
                        data={{
                            datasets: [{
                                label: 'Gas',
                                backgroundColor: ['#7EC7E6', '#00A4E7'],
                                borderColor: '#F2F2F2',
                                data: [(props.budget.gas - props.gasTotal), props.gasTotal]
                            }]
                        }}
                        options={{
                            responsive: true,
                            maintainAspectRatio: false,
                            cutoutPercentage: 60
                    }}/>
                </ChartsWrapper>
                <ChartsWrapper>
                    <H6>Entertainment</H6>
                    <BudgetNumber>${props.budget.entertainment - props.entertainmentTotal}</BudgetNumber>
                    <Doughnut
                        height={1}
                        width={1} 
                        data={{
                            datasets: [{
                                label: 'Entertainment',
                                backgroundColor: ['#BFE98B', '#82EA00'],
                                borderColor: '#F2F2F2',
                                data: [(props.budget.entertainment - props.entertainmentTotal), props.entertainmentTotal]
                            }]
                        }}
                        options={{
                            responsive: true,
                            maintainAspectRatio: false,
                            cutoutPercentage: 60
                    }}/>
                </ChartsWrapper>
                <ChartsWrapper>
                    <H6>Restaurants</H6>
                    <BudgetNumber>${props.budget.restaurants - props.restaurantsTotal}</BudgetNumber>
                    <Doughnut
                        height={1}
                        width={1} 
                        data={{
                            datasets: [{
                                label: 'Restaurants',
                                backgroundColor: ['#FFE5B0', '#FFC247'],
                                borderColor: '#F2F2F2',
                                data: [(props.budget.restaurants - props.restaurantsTotal), props.restaurantsTotal]
                            }]
                        }}
                        options={{
                            responsive: true,
                            maintainAspectRatio: false,
                            cutoutPercentage: 60
                    }}/>
                </ChartsWrapper>
                <ChartsWrapper>
                    <H6>Other</H6>
                    <BudgetNumber>${props.budget.other - props.otherTotal}</BudgetNumber>
                    <Doughnut
                        height={1}
                        width={1} 
                        data={{
                            datasets: [{
                                label: 'Other',
                                backgroundColor: ['#E3B0FF', '#C55BFF'],
                                borderColor: '#F2F2F2',
                                data: [(props.budget.other - props.otherTotal), props.otherTotal]
                            }]
                        }}
                        options={{
                            responsive: true,
                            maintainAspectRatio: false,
                            cutoutPercentage: 60
                    }}/>
                </ChartsWrapper>
            </ChartsContainer>
        </div>
    )
}

export default ChartDisplay;