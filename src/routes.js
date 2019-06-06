import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Landing from './Components/Landing/Landing';
import Login from './Components/Authentication/Login';
import Register from './Components/Authentication/Register';

export default (
    <Switch>
        <Route exact path = '/' component = {Landing} />
        <Route path = '/login' component = {Login} />
        <Route path = '/register' component = {Register} />
    </Switch>
)