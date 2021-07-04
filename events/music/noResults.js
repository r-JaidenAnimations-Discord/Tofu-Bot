const { tofuError } = require('#colors');
const Discord = require('discord.js');
const Tantrum = require('#tantrum');

module.exports = (client, message, query) => {

	const noResultsEmbed = new Discord.MessageEmbed()
		.setColor(tofuError)
		.setDescription('No matches found!');

	message.channel.send(noResultsEmbed).catch(e => { // TODO: Embedify and test
		throw new Tantrum(client, 'noResults.js', 'Error on sending noResultsEmbed', e);
	});
};
