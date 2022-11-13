const chalk = require('chalk'); //to color text on terminal

module.exports = {
    name: 'disconnected',
    execute() {
        console.log(chalk.red('[Database Status]: Disconnected.'));
    }
}