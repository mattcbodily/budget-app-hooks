import React from 'react';
import {Line} from 'react-chartjs-2';
import {library} from '@fortawesome/fontawesome-svg-core'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faChevronRight, faChevronLeft} from '@fortawesome/free-solid-svg-icons';
import {Span} from './../AnalysisStyles';
library.add(faChevronLeft, faChevronRight)
 
const LineDisplay = (props) => {
    return(
        <div>
            <FontAwesomeIcon icon='chevron-left' onClick={props.decrementStep} style={{fontSize: '18px', marginRight: '5px'}}/>
            <Span>{props.name}</Span>
            <FontAwesomeIcon icon='chevron-right' onClick={props.incrementStep} style={{fontSize: '18px', marginLeft: '5px'}}/>
            <Line 
                height={200}
                width={200}
                data={{
                    labels: props.dates,
                    datasets: [{
                        label: 'All Budget',
                        fill: false,
                        backgroundColor: props.backgroundColor,
                        borderColor: props.borderColor,
                        data: props.budget
                    }, 
                    {
                        label: 'All Expenses',
                        fill: false,
                        backgroundColor: props.backgroundColor,
                        borderColor: props.borderColor,
                        data: props.expenses
                    }]
                }}
                options={{
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: true,
                                min: 0
                            }
                        }]
                    }
                }}/>
        </div>
    )
}

export default LineDisplay;