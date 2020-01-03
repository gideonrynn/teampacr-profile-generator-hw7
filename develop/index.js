const fs = require("fs");
const inquirer = require("inquirer");
const generateHTML = require("./generateHTML");

const pdf = require('html-pdf');
const html = fs.readFileSync('./businesscard.html', 'utf8');

//create questions object with prompts for user
const questions = [
    {
        type: "input",
        name: "username",
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

  //inquirer will prompt user from questions object, then using those responses
  inquirer.prompt(questions).then(({ username, color }) => {

    pdf.create(html).toFile('./businesscard.pdf', function(err, res) {

      if (err) return console.log(err);

      console.log(res); // { filename: '/app/businesscard.pdf' }

    })

  });

}

//when the index.js is run, call initiate by default
initiate();
