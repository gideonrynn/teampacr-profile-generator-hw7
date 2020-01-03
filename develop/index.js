const fs = require("fs");
const inquirer = require("inquirer");
const axios = require("axios");

//require puppeteer package that will create pdf
const puppeteer = require("puppeteer");

//require local file that contains html template into which data will be plugged
const generateHTML = require("./generateHTML");

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

// function writeToFile(data) {

//     fs.readFile("log.txt", "utf8", function(data, error) {
//       console.log(data);

//     });
// }


function initiate() {

  //inquirer will prompt user from questions object, then using those responses to generate html and pull data from api

  inquirer.prompt(questions)
  
  .then(({ username, color }) => {
  
    //pull template from generateHTML to create pdf using puppeteer
    (async () => {
  
      try {
       
        const browser = await puppeteer.launch();

        const page = await browser.newPage();
        //await go to will pull from existing web page
         // await page.goto('https://gideonrynn.github.io/portfolio-gideonrynn-array/');
    
        const html = generateHTML({color});

        await page.setContent(html);

        //output resume pdf in A4 letter format. printBackground will display css
        await page.pdf({path: `resume_${username}.pdf`, format: 'A4', printBackground: true});

        await browser.close();
        process.exit();

      //end try
      } catch (e) {
        
        console.log('our error', e);

      //end catch
      }
      
    //end async
    }) ();
  
  //end inquirer then
  });

//end initiate function
}

//when the index.js is run, call initiate by default
initiate();
