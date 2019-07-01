import React from 'react'
import {Container, Span} from './LoadingModalStyles'
import './LoadingModal.css'
import {library} from '@fortawesome/fontawesome-svg-core'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faSpinner} from '@fortawesome/free-solid-svg-icons'
library.add(faSpinner)

const LoadingModal = (props) => {
    return(
        <Container>
            <Span>Loading</Span>
            <FontAwesomeIcon icon='spinner'  className='spinner-icon'/>
        </Container>
    )
}

export default LoadingModal;