const fs = require("fs");
const inquirer = require("inquirer");

//require puppeteer package that will create pdf
const puppeteer = require("puppeteer");

//require local file that contains html template into which data will be plugged
const generateHTML = require("./generateHTML");


// const htmlTest =  `<head>
// <style>
// h1 {
//     background-color: green;
// }
// div {
//     background-color: lightblue;
// }
// p {
//     background-color: yellow;
// }
// </style>
//</head>
// <body>
// <h1>Fire and Ice</h1>
// <h2>Robert Frost</h1>
// <div>
// Some say the world will end in fire,<br>
//Some say in ice.
// <p>From what I’ve tasted of desire<br>
// I hold with those who favor fire.</p>
// But if it had to perish twice, <br>
// I think I know enough of hate
// <p>To say that for destruction ice<br>
// Is also great</p>
// And would suffice.
// </div>
//   </body>`;



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

  //inquirer will prompt user from questions object, then using those responses
  inquirer.prompt(questions).then(({ username, color }) => {
  
    //puppeteer code to use pull template from generateHTML to create pdf
    (async () => {
  
      try {
       
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        //await go to will pull from existing web page
         // await page.goto('https://gideonrynn.github.io/portfolio-gideonrynn-array/');
    
        const html = generateHTML({color});

        await page.setContent(html);

        //output resume pdf in A4 letter format. printBackground will display css
        await page.pdf({path: 'resume.pdf', format: 'A4', printBackground: true});

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
