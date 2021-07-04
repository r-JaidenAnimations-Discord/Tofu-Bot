const { tofuOrange } = require('#colors');
const Discord = require('discord.js');
const Tantrum = require('#tantrum');

module.exports = (client, message, query, tracks, content, collector) => {

	let searchInvalidResponseEmbed = new Discord.MessageEmbed()
		.setColor(tofuOrange);

	if (content === 'cancel') {
		collector.stop();
		searchInvalidResponseEmbed.setDescription('Search was cancelled.');
		return message.channel.send(searchInvalidResponseEmbed).catch(e => { // TODO: Embedify and test
			throw new Tantrum(client, 'searchInvalidResponse.js', 'Error on sending searchInvalidResponseEmbed (cancelled)', e);
		});
	} else {
		searchInvalidResponseEmbed.setDescription(`Please enter a valid number between **1** and **${tracks.length}**!`);
		message.channel.send(searchInvalidResponseEmbed).catch(e => { // TODO: Embedify and test
			new Tantrum(client, 'searchInvalidResponse.js', 'Error on sending searchInvalidResponseEmbed (invalid number)', e);
		});
	}
};
