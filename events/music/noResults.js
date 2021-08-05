const { tofuError } = require('#colors');
const Discord = require('discord.js');
const Tantrum = require('#tantrum');

module.exports = (client, query) => {

	const noResultsEmbed = new Discord.MessageEmbed()
		.setColor(tofuError)
		.setDescription('No matches found!');

	message.channel.send({ embeds: [noResultsEmbed] }).catch(e => { // TODO: test
		throw new Tantrum(client, 'noResults.js', 'Error on sending noResultsEmbed', e);
	});
};

// NOT IN DOCS, likely no longer needed
