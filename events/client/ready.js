//const Discord = require('discord.js');
//const Tantrum = require('../../functions/tantrum.js');
//const { handleError } = require('../../functions/errorHandler.js');
const chalk = require('chalk');
const { randomStatus } = require('../../functions/statusFunction.js');
const { remindShrimp } = require('../../functions/shrimpReminder.js');
//const { staffChatID } = require('../../config.json');

module.exports = client => {
	randomStatus(client);
	remindShrimp(client);
	console.log(chalk.green(`Alive as ${client.user.tag}`));

	/*try {
		client.channels.cache.get(staffChdatID).send(`I'm back b!tches!`);
	} catch (e) {
		//return handleError(client, 'ready.js', 'Error on sending I\'m back', e);
		throw new Tantrum(client, 'ready.js', 'Error on sending I\'m back', e);
	}*/

}
