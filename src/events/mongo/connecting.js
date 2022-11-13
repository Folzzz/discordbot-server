const chalk = require('chalk'); //to color text on terminal

module.exports = {
    name: 'connecting',
    async execute() {
        console.log(chalk.yellow('[Database Status]: Connecting...'));
    }
}