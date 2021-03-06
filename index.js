const inquirer = require ('inquirer');
const mysql = require ('mysql2');
const console_table = require ('console.table');

const PORT = process.env.PORT || 3001;
const db = require ('./db/connection.js');

// This is the main function where the user decides to choose from the menu of choices. 
function main(){
  return inquirer.prompt([
    {
      type: 'list',
      name: 'main',
      message: 'What would you like to do?',
      choices: ['View Departments', 'View Roles', 'View Employees', 'Add a Department', 'Add a Role', 'Add an Employee', 'Update an Employee Role', 'Exit'],
    }
  ])
  // Depending upon the user's choice from the above menu, the appropriate function is called.
  .then(function(userChoice){
    console.log(userChoice.main);
    if (userChoice.main === 'View Departments'){
      viewDpt();
    }
    if (userChoice.main === 'View Roles'){
      viewRoles();
    }
    if (userChoice.main === 'View Employees'){
      viewEmployees();
    }
    if (userChoice.main === 'Add a Department'){
      addDpt();
    }  
    if (userChoice.main === 'Add a Role'){
      addRole();
    }
    if (userChoice.main === 'Add an Employee'){
      addEmployee();
    }
    if (userChoice.main === 'Update an Employee Role'){
      updateEmployeeRole();
    }
  })
}

// Calls the main function.
main();

// Calls the department table to be displayed from the database.
function viewDpt(){
  const sql = `SELECT * FROM department`;
  db.query (sql,(error, res)=>{
    console.table(res);
    main();
  })
}

// Calls the role table to be displayed from the database.
function viewRoles(){
  const sql = `SELECT * FROM role`;
  db.query (sql,(error, res)=>{
    console.table(res);
    main();
  });
}

// Calls the employee table to be displayed from the database.
function viewEmployees(){
  const sql = `SELECT * FROM employee`;
  db.query (sql,(error, res)=>{
    console.table(res);
    main();
  });
}

// Inserts a new department into the department table within the database.
function addDpt(){
  return inquirer.prompt([
    {
      type: 'input',
      name: 'dpt',
      message: 'What would you like to name your new department?',
    }
  ])
  .then(function(userInput){
    const sql = `INSERT INTO department (name) VALUES (?)`
    db.query (sql,[userInput.dpt],(error, res)=>{ 
      console.table(res);
    main();
    })
  })
}

// Creates a new role including salary and department_id which is added to the role table within the database.
function addRole(){
  return inquirer.prompt([
    {
      type: 'input',
      name: 'title',
      message: 'What is the name of the new role?',

    },
    {
      type: 'input',
      name: 'salary',
      message: 'What would you like the salary to be?',

    },
    {
      type: 'input',
      name: 'department_id',
      message: 'Which department does this role belong to? Enter Dept ID#',
    },
  ])
  .then(function(userInput){
    const sql = `INSERT INTO role(title,salary,department_id) VALUES (?,?,?)`;
    db.query(sql,[userInput.title,userInput.salary,userInput.department_id],(error, res)=>{
      console.table('The role has been added');
    main();
    })
  })
}

// Creates a new employee including first name and last name, role and manager name.
function addEmployee(){
  return inquirer.prompt([
    {
      type: 'input',
      name: 'first_name',
      message: 'Enter first name',
    },
    {
      type: 'input',
      name: 'last_name',
      message: 'Enter last name',
    },
    {
      type: 'input',
      name: 'role_id',
      message: 'What is the role of this new employee? Enter role ID#.',
    },
    {
      type: 'input',
      name: 'manager_id',
      message: 'Who is the manager of this new employee? Enter employee/manager ID#.',
    }
  ])
  .then(function(userInput){
    const sql = `INSERT INTO employee(first_name,last_name,role_id,manager_id) VALUES (?,?,?,?)`;
    db.query(sql,[userInput.first_name,userInput.last_name,userInput.role_id,userInput.manager_id],(error, res)=>{
      console.table('The employee has been added');
    main();
    })
  })
}

// Updates the role of the employee.
function updateEmployeeRole(){
  return inquirer.prompt([
    {
      type: 'input',
      name: 'id',
      message: 'For which employee do you want change their role?  Enter their employee ID#', 
    },
    {
      type: 'input',
      name: 'role_id',
      message: 'Which role do you want that employee to change to?  Enter the role ID#',
    },
  ])
  .then(function(userInput){
    const sql = `UPDATE employee SET role_id = ? WHERE id = ?`;
    db.query(sql,[userInput.role_id,userInput.id],(error, res)=>{
      console.table('The role of the employee has been updated');
    main();
    })
  })
}

