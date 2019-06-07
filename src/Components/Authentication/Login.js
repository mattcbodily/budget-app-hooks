import React, {useState} from 'react';
import axios from 'axios';
import {library} from '@fortawesome/fontawesome-svg-core'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faEnvelope} from '@fortawesome/free-solid-svg-icons';
import logo from './assets/placeholder_logo.png';
import {Image, H4, Input, Button} from './AuthenticationStyles';
library.add(faEnvelope)

const Login = (props) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = () => {
        axios.post('/auth/login', {email, password})
        .then(res => {
            props.history.push('/budget')
        })
    }

    return(
        <div>
            <Image src={logo} alt='Company Logo' />
            <H4>Budget</H4>
            {/* <FontAwesomeIcon icon='envelope' /> */}
            <Input 
                value={email}
                placeholder='Email'
                maxLength='40'
                onChange={e => setEmail(e.target.value)} />
            <Input 
                value={password}
                type='password'
                placeholder='Password'
                maxLength='40'
                onChange={e => setPassword(e.target.value)} />
            <Button onClick={handleLogin}>Login</Button>
        </div>
    )
}

export default Login;