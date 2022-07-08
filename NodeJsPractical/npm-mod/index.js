const chalk = require("chalk");
const validator = require('validator');

console.log(chalk.green.inverse("success"));
console.log(chalk.blue("Hello world!"));
console.log(chalk.red.inverse("failed"));

const res = validator.isEmail('abc@gmail.com');
console.log(res ? chalk.green.inverse(res) : chalk.red.inverse(res));