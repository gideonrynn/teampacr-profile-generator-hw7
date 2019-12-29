const inquirer = require("inquirer");


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

function writeToFile(fileName, data) {
 
}

function initiate() {

}

//when the index.js is run, call initiate by default
initiate();
