DROP TABLE IF EXISTS department;

DROP TABLE IF EXISTS role;

DROP TABLE IF EXISTS employee;

CREATE TABLE department (
  id INTEGER PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(30) NOT NULL
);

CREATE TABLE role (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL(10,2) NOT NULL,
    department_id INTEGER NOT NULL,
    constraint department_fk FOREIGN KEY (department_id) REFERENCES department (id)

);

CREATE TABLE employee (
  id INTEGER PRIMARY KEY AUTO_INCREMENT,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INTEGER NOT NULL,
  constraint employee_fk FOREIGN KEY (role_id) REFERENCES role (id),
  manager_id INTEGER,
  constraint manager_fk FOREIGN KEY (manager_id) REFERENCES employee (id)
);