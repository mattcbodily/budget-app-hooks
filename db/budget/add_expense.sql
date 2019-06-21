insert into user_spending (
    user_id,
    budget_id,
    expense_name,
    category,
    amount,
    date
) values (
    $1,
    $2,
    $3,
    $4,
    $5,
    $6
);