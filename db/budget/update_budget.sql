update user_monthly_budget
set (budget, groceries, gas, entertainment, restaurants, other) = ($1, $2, $3, $4, $5, $6)
where budget_id = $7;