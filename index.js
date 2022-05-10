const inquirer = require ('inquirer');
const mysql = require ('mysql2');
const console_table = require ('console.table');

const PORT = process.env.PORT || 3001;
const db = require ('./db/connection.js');

function main(){
  return inquirer.prompt([
    {
      type: 'list',
      name: 'main',
      message: 'What would you like to do?',
      choices: ['View Departments', 'View Roles', 'View Employees', 'Add a Department', 'Add a Role', 'Add an Employee', 'Update an Employee Role', 'Exit'],
    }
  ])
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
  })
}

main();

function viewDpt(){
  const sql = `SELECT * FROM department`;
  db.query (sql,(error, res)=>{
    console.table(res);
    main();

  })
}

function viewRoles(){
  const sql = `SELECT * FROM role`;
  db.query (sql,(error, res)=>{
    console.table(res);
    main();

  });
}

function viewEmployees(){
  const sql = `SELECT * FROM employee`;
  db.query (sql,(error, res)=>{
    console.table(res);
    main();

  });
}

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
      message: 'Which department does this role belong to?',
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
      message: 'What is the role of this new employee?',
    },
    {
      type: 'input',
      name: 'manager_id',
      message: 'Who is the manager of this new employee?',
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