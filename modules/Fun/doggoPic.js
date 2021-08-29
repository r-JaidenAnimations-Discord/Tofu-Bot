const { tofuGreen, tofuError } = require('#colors');
const Discord = require('discord.js');
const Tantrum = require('#tantrum');
const fetch = require('node-fetch');
const { loadingString } = require('#utils/funnyLoad.js');

module.exports = {
	name: 'dog',
	helpTitle: 'Dog',
	category: 'Fun',
	usage: 'dog',
	description: 'Get yourself a cute doge pic',
	isDMAllowed: false,
	isDeprecated: false,
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

		const APIresponse = await fetch(endpoint).then(r => r.json());

		if (APIresponse.status === 'success') {
			dogEmbed.setTitle('Cute doggo');
			dogEmbed.setImage(APIresponse.message);
			return msg.edit({ embeds: [dogEmbed] }).catch(e => {
				throw new Tantrum(client, 'doggoPic.js', 'Error on editing dogEmbed', e);
			});
		}
		if (msg.deletable) msg.delete();
		new Tantrum(client, 'doggoPic.js', 'API did not respond', 'No error message defined');
		return message.channel.send({ embeds: [new Discord.MessageEmbed().setDescription('So uh the API doesn\'t wanna talk rn').setColor(tofuError)] }).catch(e => {
			new Tantrum(client, 'doggoPic.js', 'Error on sending error embed', e);
		});
	},
};
