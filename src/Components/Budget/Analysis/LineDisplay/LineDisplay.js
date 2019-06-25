import React from 'react';
import {Line} from 'react-chartjs-2';
import {library} from '@fortawesome/fontawesome-svg-core'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faChevronRight, faChevronLeft} from '@fortawesome/free-solid-svg-icons';
library.add(faChevronLeft, faChevronRight)
 
const LineDisplay = (props) => {
    return(
        <div>
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
            <FontAwesomeIcon icon='chevron-left' onClick={props.decrementStep}/>{props.name}<FontAwesomeIcon icon='chevron-right' onClick={props.incrementStep}/>
        </div>
    )
}

export default LineDisplay;