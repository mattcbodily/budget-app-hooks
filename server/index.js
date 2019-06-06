require('dotenv').config();
const express = require('express');
const {json} = require('body-parser');
const massive = require('massive');
const session = require('express-session');
const main = require('./controllers/mainController');
const auth = require('./controllers/authController');
const {SERVER_PORT, CONNECTION_STRING, SESSION_SECRET} = process.env;

const app = express();
app.use(json());

app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))

massive(CONNECTION_STRING).then(db => {
    app.set('db', db)
})

//authorization endpoints
app.post('/auth/register', auth.register);
app.post('/auth/login', auth.login);
app.post('/auth/logout', auth.logout);
app.get('/auth/session-user', auth.getSessionUser);

//main endpoints
app.get('/api/monthly-budget/:id', main.getUserBudget); //found in the BudgetProgress component, takes the user id
app.get('/api/expenses/:id', main.getUserExpenses); //found in the BudgetProgress component, takes the budget id
app.post('/api/monthly-budget', main.addMonthlyBudget); //found in the BudgetPlanner component
app.post('/api/expense', main.addExpense); //found in the ExpenseModal component

const port = SERVER_PORT || 5100;
app.listen(port, () => console.log(`Budgeting the things on ${port}`))