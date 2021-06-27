// const Discord = require('discord.js');
// const Tantrum = require('#tantrum');
const chalk = require('chalk');
const { pluralizeWithNumber } = require('#utils/pluralize.js');
const { randomStatus } = require('#utils/statusFunction.js');
const { remindShrimp } = require('#utils/shrimpReminder.js');

module.exports = client => {

	randomStatus(client);
	remindShrimp(client);
	console.log(chalk.green(`Alive as ${client.user.tag}\nOn ${pluralizeWithNumber('guild', client.guilds.cache.size)}\nAnnoying ${pluralizeWithNumber('hooman', client.users.cache.size)}`));

	client.tags.sync();
	client.movieSuggestions.sync();

	/*try {
		client.channels.cache.get(staffChdatID).send(`I'm back b!tches!`);
	} catch (e) {
		throw new Tantrum(client, 'ready.js', 'Error on sending I\'m back', e);
	}*/

}
