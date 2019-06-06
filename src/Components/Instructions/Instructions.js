import React, {useState} from 'react';
import {Link} from 'react-router-dom';

const Instructions = (props) => {
    const [step, setStep] = useState(1)

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
                        step one
                        <button onClick={incrementStep}>Next</button>
                    </div>
                )
            case 2:
                return (
                    <div>
                        step two
                        <button onClick={decrementStep}>Back</button>
                        <button onClick={incrementStep}>Next</button>
                    </div>
                )
            case 3: 
                return (
                    <div>
                        step three
                        <button onClick={decrementStep}>Back</button>
                        <Link to='/planner'>Got it</Link>
                    </div>
                )
            default:
                return;
        }
    }

    return (
        <div>
            {showStep()}
        </div>
    )
}

export default Instructions;