import React from 'react';
import {Link} from 'react-router-dom';

const Landing = (props) => {
    return(
        <div>
            <h4>Welcome to Budget!</h4>
            {/* logo goes here */}
            <Link to='/register'><button>Register</button></Link>
            <Link to='/login'><button>Login</button></Link>
        </div>
    )
}

export default Landing;