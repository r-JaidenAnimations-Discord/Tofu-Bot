const { tofuGreen, tofuError } = require('#colors');
const Discord = require('discord.js');
const fetch = require('node-fetch');
const { loadingString } = require('#utils/funnyLoad.js');

module.exports = {
	name: 'dog',
	helpTitle: 'Dog',
	category: 'Fun',
	usage: 'dog',
	description: 'Get yourself a cute doge pic',
	isDMAllowed: false,
	isDangerous: false,
	mainServerOnly: false,
	isHidden: false,
	aliases: ['doge', 'doggo'],
	cooldown: 0,
	execute: async function(client, message, args) {
		const dogEmbed = new Discord.MessageEmbed()
			.setColor(tofuGreen)
			.setTitle(loadingString());

		const msg = await message.channel.send({ embeds: [dogEmbed] });

		// API endpoint
		const endpoint = 'https://dog.ceo/api/breeds/image/random';

		const APIresponse = await fetch(endpoint)
			.then(r => r.json())
			.catch(e => new Tantrum(client, e));

		if (APIresponse.status === 'success') {
			dogEmbed.setTitle('Cute doggo');
			dogEmbed.setImage(APIresponse.message);
			return msg.edit({ embeds: [dogEmbed] });
		}
		if (msg.deletable) msg.delete();
		
		return message.channel.send({ embeds: [new Discord.MessageEmbed().setDescription('So uh the API doesn\'t wanna talk rn').setColor(tofuError)] });
	},
};
