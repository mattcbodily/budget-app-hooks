import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Landing from './Components/Landing/Landing';
import Login from './Components/Authentication/Login';
import Register from './Components/Authentication/Register';
import Instructions from './Components/Instructions/Instructions';
import BudgetPlanner from './Components/Budget/BudgetPlanner';
import BudgetProgress from './Components/Budget/BudgetProgress';

export default (
    <Switch>
        <Route exact path = '/' component = {Landing} />
        <Route path = '/login' component = {Login} />
        <Route path = '/register' component = {Register} />
        <Route path = '/instructions' component = {Instructions} />
        <Route path = '/planner' component = {BudgetPlanner} />
        <Route path = '/budget' component = {BudgetProgress} />
    </Switch>
)