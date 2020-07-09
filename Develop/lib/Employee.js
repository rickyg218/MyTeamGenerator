// TODO: Write code to define and export the Employee class
const inquire = require("inquirer");

class Employee{
    constructor(name,id,email){
        this.name = name,
        this.email = email,
        this.id = id,

        this.getName= ()=>{
            return this.name;
        };
        this.getEmail = ()=>{
            return this.email
        } 
        this.getId = ()=>{
            return this.id;
        }
        this.getRole = () =>{
            return "Employee"
        }
    }
}


module.exports= Employee
