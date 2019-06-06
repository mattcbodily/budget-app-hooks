import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Landing from './Components/Landing/Landing';
import Login from './Components/Authentication/Login';
import Register from './Components/Authentication/Register';
import Instructions from './Components/Instructions/Instructions';

export default (
    <Switch>
        <Route exact path = '/' component = {Landing} />
        <Route path = '/login' component = {Login} />
        <Route path = '/register' component = {Register} />
        <Route path = '/instructions' component = {Instructions} />
    </Switch>
)