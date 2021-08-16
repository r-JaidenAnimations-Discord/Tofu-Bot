// const Discord = require('discord.js');
// const Tantrum = require('#tantrum');
const chalk = require('chalk');
const { pluralizeWithNumber } = require('#utils/pluralize.js');
const { randomStatus } = require('#utils/statusFunction.js');
const { publishInteractions } = require('#utils/publishInteractions.js');

module.exports = async (client) => {

	randomStatus(client);
	console.log(chalk.green(`Alive as ${client.user.tag}\nOn ${pluralizeWithNumber('guild', client.guilds.cache.size)}\nAnnoying ${pluralizeWithNumber('hooman', client.users.cache.size)}`));

	client.tags.sync();
	client.movieSuggestions.sync();

	// --register slashies
	if (process.argv.includes('--register')) await publishInteractions(client);

	/*try {
		client.channels.cache.get(staffChdatID).send(`I'm back b!tches!`);
	} catch (e) {
		throw new Tantrum(client, 'ready.js', 'Error on sending I\'m back', e);
	}*/

}
