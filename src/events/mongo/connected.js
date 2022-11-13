const chalk = require('chalk'); //to color text on terminal

module.exports = {
    name: 'connected',
    execute() {
        console.log(chalk.green('[Database Status]: Connected.'));
    }
}