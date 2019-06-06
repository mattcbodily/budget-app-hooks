import React, {useState} from 'react';
import axios from 'axios';

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
            <input 
                value={email}
                placeholder='Email'
                maxLength='40'
                onChange={e => setEmail(e.target.value)} />
            <input 
                value={password}
                type='password'
                placeholder='Password'
                maxLength='40'
                onChange={e => setPassword(e.target.value)} />
            <button onClick={handleLogin}>Login</button>
        </div>
    )
}

export default Login;