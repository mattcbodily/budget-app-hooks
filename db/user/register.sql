insert into budget_users (
    email,
    username,
    password
) values (
    $1,
    $2,
    $3
)
returning *;