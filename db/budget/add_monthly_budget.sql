insert into user_monthly_budget (
    user_id,
    budget,
    groceries,
    gas,
    entertainment,
    restaurants,
    other,
    date
) values (
    $1,
    $2,
    $3,
    $4,
    $5,
    $6,
    $7,
    $8
);