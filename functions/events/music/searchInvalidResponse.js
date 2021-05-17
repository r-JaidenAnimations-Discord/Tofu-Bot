const { tofuOrange } = require('../../config.json');
const Discord = require('discord.js');
const Tantrum = require('../../functions/tantrum.js');

module.exports = (client, message, query, tracks, content, collector) => {
	let searchInvalidResponseEmbed = new Discord.MessageEmbed()
		.setColor(tofuOrange);

	if (content === 'cancel') {
		collector.stop();
		searchInvalidResponseEmbed.setDescription('Search was cancelled.');
		try {
			return message.channel.send(searchInvalidResponseEmbed);
		} catch (e) {
			throw new Tantrum(client, 'searchInvalidResponse.js', 'Error on sending searchInvalidResponseEmbed (cancelled)', e);
		}
	} else {
		searchInvalidResponseEmbed.setDescription(`Please enter a valid number between **1** and **${tracks.length}**!`);
		try {
			message.channel.send(searchInvalidResponseEmbed);
		} catch (e) {
			new Tantrum(client, 'searchInvalidResponse.js', 'Error on sending searchInvalidResponseEmbed (invalid number)', e);
		}
	}
};
