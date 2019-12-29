const fs = require("fs");
const inquirer = require("inquirer");
const generateHTML = require("./generateHTML");

//create questions object with prompts for user
const questions = [
    {
        type: "input",
        name: "github",
        message: "What is your GitHub username?"
      },
    
      {
        type: "list",
        name: "color",
        message: "What is your favorite color?",
        choices: ["red", "blue", "green", "pink"]
      }
  
];

// function writeToFile(fileName, data) {
 
// }

function initiate() {

  //inquirer will prompt user from questions object
  inquirer.prompt(questions)

}

//when the index.js is run, call initiate by default
initiate();
