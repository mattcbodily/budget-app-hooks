import React from 'react';
import {Link} from 'react-router-dom';

import {
    Button
} from './LandingStyles';

const Landing = (props) => {
    return(
        <div>
            <h4>Welcome to Budget!</h4>
            {/* logo goes here */}
            <Link to='/register'><Button>Register</Button></Link>
            <Link to='/login'><Button>Login</Button></Link>
        </div>
    )
}

export default Landing;