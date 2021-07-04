const { tofuGreen } = require('#colors');
const Discord = require('discord.js');
const Tantrum = require('#tantrum');
const { quotes } = require('#commandData/jaidenQuoteList.js');

module.exports = {
	name: 'quote',
	helpTitle: 'Jaiden Quote',
	category: 'Fun',
	usage: 'quote',
	description: 'Send a random quote from Jaiden',
	isDMAllowed: false,
	isDeprecated: false,
	isDangerous: false,
	isHidden: false,
	aliases: ['jaidenquote', 'jquote'],
	cooldown: 3,
	execute: async function(client, message, args) {

		const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

		const randomQuoteEmbed = new Discord.MessageEmbed()
			.setColor(tofuGreen)
			.setDescription(randomQuote);

		message.channel.send(randomQuoteEmbed).catch(e => { // TODO: Embedify and test
			throw new Tantrum(client, 'jaidenQuote.js', 'Error on sending randomQuoteEmbed', e);
		});
	},
};
