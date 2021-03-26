//const Discord = require('discord.js');
const chalk = require('chalk');
const { randomStatus } = require('../../functions/statusFunction.js');
//const { staffChatID } = require('../../config.json');
const { handleError } = require('../../functions/errorHandler.js');

module.exports = client => {
	randomStatus(client);
	console.log(chalk.green(`Alive as ${client.user.tag}`));

	/*try {
		client.channels.cache.get(staffChatID).send(`I'm back b!tches!`);
	} catch (e) {
		return handleError(client, 'ready.js', 'Error on sending I\'m back', e);
	}*/

}
