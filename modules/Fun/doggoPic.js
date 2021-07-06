const { tofuGreen, tofuError } = require('#colors');
const Discord = require('discord.js');
const https = require('https');
const Tantrum = require('#tantrum');

module.exports = {
	name: 'dog',
	helpTitle: 'Dog',
	category: 'Fun',
	usage: 'dog',
	description: 'Get yourself a cute doge pic',
	isDMAllowed: false,
	isDeprecated: false,
	isDangerous: true,
	isHidden: true,
	aliases: ['doge', 'doggo'],
	cooldown: 0,
	execute: async function(client, message, args) {

		message.channel.startTyping();

		// API endpoint
		const endpoint = `https://dog.ceo/api/breeds/image/random`;

		const dogEmbed = new Discord.MessageEmbed()
			.setColor(tofuGreen)
			.setTitle('Cute doggo');

		https.get(endpoint, function(res) {
			var body = '';

			res.on('data', function(chunk) {
				body += chunk;
			});

			res.on('close', () => {
				var APIresponse = JSON.parse(body);

				if (APIresponse.status === 'success') {
					dogEmbed.setImage(APIresponse.message);
					message.channel.stopTyping();
					return message.channel.send({ embeds: [dogEmbed] }).catch(e => {
						console.log(`kek ${e}`);
					});
				}
				return sendError('API Returned failure');
			});
		}).on('error', function(e) {
			sendError(e);
		});

		function sendError(e) {
			message.channel.stopTyping();
			new Tantrum(client, 'doggoPic.js', 'API did not respond', e);
			message.channel.send({ embeds: [new Discord.MessageEmbed().setDescription(`So uh the API doesn't wanna talk rn`).setColor(tofuError)] }).catch(f => {
				new Tantrum(client, 'doggoPic.js', 'Error on sending error embed', f);
			});
		}

	},
};
