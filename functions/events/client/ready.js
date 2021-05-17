const chalk = require('chalk');

module.exports = client => {
	console.log(chalk.green(`Alive as ${client.user.tag}`));
}
