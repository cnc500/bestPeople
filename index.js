const inquirer = require ('inquirer');
const mysql = require ('mysql2');
const console_table = require ('console.table');

function main(){
  return inquirer.prompt([
    {
      type: 'list',
      name: 'main',
      message: 'What would you like to do?',
      choices: ['View Departments', 'View Roles', 'View Employees', 'Exit'],
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
  })
}

function viewDpt(){
  
}

function viewRoles(){

}

function viewEmployees(){

}

main();