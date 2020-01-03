const fs = require("fs");
const inquirer = require("inquirer");

//require puppeteer package that will create pdf
const puppeteer = require("puppeteer");

//require local file that contains html template into which data will be plugged
const generateHTML = require("./generateHTML");

//test for html-pdf, which has been uninstalled due to security vulnerability
// const html = fs.readFileSync('./businesscard.html', 'utf8');
const writeFileAsync = util.promisify(fs.writeFile);

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

    //puppeteer code to use new index to create pdf
    (async () => {
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      await page.goto('https://gideonrynn.github.io/portfolio-gideonrynn-array/');
      await page.pdf({path: 'resume.pdf', format: 'A4'});
     
      await browser.close();
    })();
    
  });

}

//when the index.js is run, call initiate by default
initiate();
