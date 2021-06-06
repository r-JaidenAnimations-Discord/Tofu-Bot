// const Discord = require('discord.js');
// const Tantrum = require('#tantrum');
const chalk = require('chalk');
const { randomStatus } = require('#functions/statusFunction.js');
const { remindShrimp } = require('#functions/shrimpReminder.js');
//const { staffChatID } = require('../../config.json');

module.exports = client => {
	//const { staffChatID } = client.config;

	randomStatus(client);
	remindShrimp(client);
	console.log(chalk.green(`Alive as ${client.user.tag}\nOn ${client.guilds.cache.size} guilds\nAnnoying ${client.users.cache.size} hoomans`));

	/*try {
		client.channels.cache.get(staffChdatID).send(`I'm back b!tches!`);
	} catch (e) {
		throw new Tantrum(client, 'ready.js', 'Error on sending I\'m back', e);
	}*/

}
