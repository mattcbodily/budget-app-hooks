select budget, budget_id, date, groceries, gas, entertainment, restaurants, other from user_monthly_budget
where user_id = $1;