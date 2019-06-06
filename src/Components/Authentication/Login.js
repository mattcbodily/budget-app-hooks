import React, {useState} from 'react';
import axios from 'axios';
import {logo} from './placeholder_logo.png'
import {Image, Input, Button} from './AuthenticationStyles';

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
            <Image />
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