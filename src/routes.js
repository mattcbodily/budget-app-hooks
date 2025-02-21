import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Landing from './Components/Landing/Landing';
import Login from './Components/Authentication/Login';
import Register from './Components/Authentication/Register';
import Instructions from './Components/Instructions/Instructions';
import BudgetPlanner from './Components/Budget/BudgetPlanner/BudgetPlanner';
import BudgetProgress from './Components/Budget/BudgetProgress/BudgetProgress';
import Analysis from './Components/Budget/Analysis/Analysis';

export default (
    <Switch>
        <Route exact path = '/' component = {Landing} />
        <Route path = '/login' component = {Login} />
        <Route path = '/register' component = {Register} />
        <Route path = '/instructions' component = {Instructions} />
        <Route path = '/planner' component = {BudgetPlanner} />
        <Route path = '/budget' component = {BudgetProgress} />
        <Route path = '/analysis' component = {Analysis} />
    </Switch>
)