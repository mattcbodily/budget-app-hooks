insert into user_spending (
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
    $5
);