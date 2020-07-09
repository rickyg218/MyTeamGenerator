const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

var employees = []
console.log(employees);

function choosePosition() {
    inquirer.prompt({
        type: "list",
        choices: ["Add a Manager", "Add an Engineer","Add an Intern","Generate Team"],
        message: "What do you wanna do?",
        name:"questions"
    }).then(function ({ questions }) {
        switch (questions) {
            case "Add a Manager":
                let [hasManager] = employees.filter(emp => emp.officeNumber)
                console.log("do we have a manager?", hasManager);
                if (hasManager) {
                    console.log("You already have a manager!");
                    choosePosition();
                    break;
                }
                else {
                    createManager();
                    break;
                }

            case "Add an Engineer":
                createEngineer();
                break;

            case "Add an Intern":
                createIntern();
                break;

            case "Generate Team":
                let [hasTeam] = employees.filter(emp => emp.name)
                console.log("do we have a team", hasTeam)
                if (hasTeam) {
                    console.log("Generating your team page!");
                    console.log(employees);
                    fs.writeFile(outputPath, render(employees), function (err) {
                        if (err) {
                            return console.log(err);
                        }
                        console.log("Successfully Written TeamPage, check your output folder");
                    })
                    break;
                } else {
                    console.log("You don't have anyone on your team! Please add at least one employee.");
                    choosePosition();
                }
                break;
    
        }
    })
}

function createManager(){
    inquirer.prompt([
   {
      type:"input",
      message: "Please Enter manager's name",
      name:"name", 
   },
   {
    type:"input",
    message:"Please Enter Manager's Id",
    name: "id"
   },
   {
       type: "input",
       message: "Please Enter Manager's email",
       name: "email"
   },
   {
       type: "input",
       message: "Please Enter Manager's Office Number",
       name: "officeNumber"
   }]).then(function (answers) {
           const manager = new Manager(answers.name, answers.id, answers.email, answers.officeNumber);
           employees.push(manager);
           choosePosition();
    })
}
function createEngineer() {
    inquirer.prompt([
        {
            type: "input",
            message: "Please Enter Engineer's name",
            name: "name",
        },
        {
            type: "input",
            message: "Please Enter Engineer's Id",
            name: "id"
        },
        {
            type: "input",
            message: "Please Enter Engineers email",
            name: "email"
        },
        {
            type: "input",
            message: "Please Enter your Github",
            name: "Github"
        }
            
    ]).then(function (answers) {
        const engineer = new Engineer(answers.name, answers.id, answers.email, answers.Github);
        employees.push(engineer);
        choosePosition()
    })
}
function createIntern() {
    inquirer.prompt([
        {
            type: "input",
            message: "Please Enter Interns name",
            name: "name",
        },
        {
            type: "input",
            message: "Please Enter Interns Id",
            name: "id"
        },
        {
            type: "input",
            message: "Please Enter Inter's school Information",
            name: "School"
        }
    ]).then(function (answers) {
        const intern = new Intern(answers.name, answers.id, answers.School)
        employees.push(intern);
        choosePosition();
    })
}

choosePosition()

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
