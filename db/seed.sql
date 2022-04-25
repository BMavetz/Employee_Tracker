INSERT INTO department (dept_name)
VALUES ('Sales'), ('Finance'), ('IT'), ('Accounting');

INSERT INTO job_role(title, salary, dept_id)
VALUES('Sales Associate', '50000', 1),
('Finance Director', '150000', 2),
('Financial Associate', '75000', 2),
('Systems Analyst', '85000', 3),
('Auditor', '80000', 4),
('Sales Manager', '140000', 1)
;

INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES ('John', 'Smith', 2, NULL),
('Peter', 'Clarke', 3, 1),
('Allie', 'Jones', 6, NULL),
('Sam', 'Peterson', 1, 3);