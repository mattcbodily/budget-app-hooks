module.exports = {
    getUserBudget: (req, res) => {
        const {id} = req.params;
        req.app.get('db').budget.get_user_budget(id)
        .then(budget => res.status(200).send(budget))
        .catch(err => res.status(500).send({errorMessage: 'Error!'}, console.log(err)))
    },
    addMonthlyBudget: (req, res) => {
        const {user_id, budget, groceries, gas, entertainment, restaurants, other, date} = req.body;
        req.app.get('db').budget.add_monthly_budget(user_id, budget, groceries, gas, entertainment, restaurants, other, date)
        .then(budget => res.status(200).send(budget))
        .catch(err => res.status(500).send({errorMessage: 'Error!'}, console.log(err)))
    },
    addExpense: (req, res) => {
        const {user_id, budget_id, expense_name, category, amount, date} = req.body;
        req.app.get('db').budget.add_expense(user_id, budget_id, expense_name, category, amount, date)
        .then(res.sendStatus(200))
        .catch(err => res.status(500).send({errorMessage: 'Error!'}, console.log(err))) 
    },
    getUserExpenses: (req, res) => {
        const {id} = req.params;
        req.app.get('db').budget.get_user_expenses(id)
        .then(expenses => res.status(200).send(expenses))
        .catch(err => res.status(500).send({errorMessage: 'Error!'}, console.log(err)))
    },
    updateBudget: (req, res) => {
        const {budget, groceries, gas, entertainment, restaurants, other, budget_id} = req.body;
        req.app.get('db').budget.update_budget(budget, groceries, gas, entertainment, restaurants, other, budget_id)
        .then(res.sendStatus(200))
        .catch(err => res.status(500).send({errorMessage: 'Error!'}, console.log(err)))
    }
}