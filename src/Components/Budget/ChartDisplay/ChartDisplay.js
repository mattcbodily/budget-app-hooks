import React from 'react';
import {Doughnut} from 'react-chartjs-2';
import {H6, ChartsContainer, ChartsWrapper, BudgetNumber, GroceryNumber, GasNumber, ENumber, RestaurantsNumber, OtherNumber} from '../BudgetProgress/ProgressStyles';

const ChartDisplay = (props) => {
    return(
        <div>
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
                                backgroundColor: ['#FF4242', '#FFAAAA'],
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
                    <GroceryNumber>${props.budget.groceries - props.groceriesTotal}</GroceryNumber>
                    <Doughnut
                        height={1}
                        width={1} 
                        data={{
                            datasets: [{
                                label: 'Groceries',
                                backgroundColor: ['#FF8A8A', '#DB0000'],
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
                    <GasNumber>${props.budget.gas - props.gasTotal}</GasNumber>
                    <Doughnut
                        height={1}
                        width={1} 
                        data={{
                            datasets: [{
                                label: 'Gas',
                                backgroundColor: ['#7EC7E6', '#00A4E7'],
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
                    <ENumber>${props.budget.entertainment - props.entertainmentTotal}</ENumber>
                    <Doughnut
                        height={1}
                        width={1} 
                        data={{
                            datasets: [{
                                label: 'Entertainment',
                                backgroundColor: ['#BFE98B', '#82EA00'],
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
                    <RestaurantsNumber>${props.budget.restaurants - props.restaurantsTotal}</RestaurantsNumber>
                    <Doughnut
                        height={1}
                        width={1} 
                        data={{
                            datasets: [{
                                label: 'Restaurants',
                                backgroundColor: ['#FFE5B0', '#FFC247'],
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
                    <OtherNumber>${props.budget.other - props.otherTotal}</OtherNumber>
                    <Doughnut
                        height={1}
                        width={1} 
                        data={{
                            datasets: [{
                                label: 'Other',
                                backgroundColor: ['#E3B0FF', '#C55BFF'],
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