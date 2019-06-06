import React, {useState} from 'react';
import axios from 'axios';

import {
    Input,
    Button
} from './AuthenticationStyles';

const Register = (props) => {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [verPassword, setVerPassword] = useState('');

    const handleRegister = () => {
        if(password !== verPassword){
            alert('Passwords do not Match')
        } else {
            axios.post('/auth/register', {email, username, password})
            .then(res => {
                props.history.push('/instructions')
        })}
    }

    return(
        <div>
            <h3>Budget</h3>
            <Input 
                value={email}
                placeholder='Email'
                maxLength='40'
                onChange={e => setEmail(e.target.value)}/>
            <Input 
                value={username}
                placeholder='Username'
                maxLength='20'
                onChange={e => setUsername(e.target.value)}/>
            <Input
                value={password} 
                placeholder='Password'
                maxLength='40'
                type='password'
                onChange={e => setPassword(e.target.value)}/>
            <Input
                value={verPassword} 
                placeholder='Verify Password'
                maxLength='40'
                type='password'
                onChange={e => setVerPassword(e.target.value)}/>
            <Button onClick={handleRegister}>Register</Button>
        </div>
    )
}

export default Register;