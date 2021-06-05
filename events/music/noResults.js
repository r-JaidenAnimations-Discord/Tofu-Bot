//const { tofuError } = require('../../config.json');
const { tofuError } = require('#colors');
const Discord = require('discord.js');
const Tantrum = require('#functions/tantrum.js');

module.exports = (client, message, query) => {
	// const { tofuError } = client.config;

	const noResultsEmbed = new Discord.MessageEmbed()
		.setColor(tofuError)
		.setDescription('No matches found!');

	try {
		message.channel.send(noResultsEmbed);
	} catch (e) {
		throw new Tantrum(client, 'noResults.js', 'Error on sending noResultsEmbed', e);
	}
};
