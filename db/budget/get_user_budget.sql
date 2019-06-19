select * from user_monthly_budget
where user_id = $1
order by date desc;