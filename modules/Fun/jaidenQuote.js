const Discord = require('discord.js');
const { tofuGreen } = require('../../config.json')
const { quotes } = require('../../commanddata/jaidenQuoteList.js');

module.exports = {
	name: 'jaidenquote',
	helpTitle: 'Jaiden Quote',
    category: 'Fun',
    usage: 'jaidenquote',
    description: 'Send a random quote from Jaiden',
	isEnabled: true,
	aliases: ['quote', 'jquote'],
	cooldown: 3,
	execute: async function(client, message, args) {
        const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
		
		const randomQuoteEmbed = new Discord.MessageEmbed()
			.setColor(tofuGreen)
			.setDescription(randomQuote);

		message.channel.send(randomQuoteEmbed);
	},
};