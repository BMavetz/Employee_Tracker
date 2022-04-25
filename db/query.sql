SELECT job_role.id, title, dept_name, salary
FROM job_role
JOIN department ON job_role.dept_id = department.id;

SELECT e.id, e.first_name, e.last_name, title, dept_name, salary, CONCAT(m.first_name, ' ', m.last_name) AS Manager
FROM employee e
LEFT JOIN employee m ON e.manager_id = m.id
JOIN job_role ON e.role_id = job_role.id
JOIN department ON job_role.dept_id = department.id;