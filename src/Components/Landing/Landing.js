import React from 'react';
import {Link} from 'react-router-dom';
import logo from './../Authentication/assets/placeholder_logo.png';
import {H4, Image, Button} from './LandingStyles';


const Landing = (props) => {
    return(
        <div>
            <H4>Welcome to Budget!</H4>
            <Image src={logo} alt='Company Logo' />
            <Link to='/register'><Button>Register</Button></Link>
            <Link to='/login'><Button>Login</Button></Link>
        </div>
    )
}

export default Landing;