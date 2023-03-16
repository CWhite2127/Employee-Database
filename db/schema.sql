DROP DATABASE IF EXISTS employees_db;
CREATE DATABASE employees_db;

create table department (
id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
name VARCHAR(30) NOT NULL
);

create table role ( 
id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
title VARCHAR(30) NOT NULL,
salary DECIMAL NOT NULL,
department_id INT,
CONSTRAINT fk_department FOREIGN KEY (department_id)
REFERENCES department(id)
);

create table employee (
id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
first_name VARCHAR(30) NOT NULL,
last_name VARCHAR(30) NOT NULL,
role_id INT,
manager_id INT,
CONSTRAINT fk_role FOREIGN KEY (role_id)
REFERENCES role(id),
CONSTRAINT fk_manager FOREIGN KEY (manager_id)
REFERENCES employee(id)
);