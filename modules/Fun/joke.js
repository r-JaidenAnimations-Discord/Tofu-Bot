const { tofuGreen, tofuError } = require('#colors');
const Discord = require('discord.js');
const https = require('https');
const Tantrum = require('#tantrum');
const { generalStrings } = require('#assets/global/strings.json');

module.exports = {
	name: 'joke',
	helpTitle: 'Joke',
	category: 'Fun',
	usage: 'joke',
	description: 'Bad jokes!',
	isDMAllowed: false,
	isDeprecated: false,
	isDangerous: false,
	isHidden: false,
	// aliases: [],
	cooldown: 5,
	execute: async function(client, message, args) {
		let msg = await message.channel.send(generalStrings.loading);

		// API endpoint
		const url = `https://official-joke-api.appspot.com/random_joke`;

		const jokeEmbed = new Discord.MessageEmbed()
			.setColor(tofuGreen)
			.setFooter('The API does not have good jokes, don\'t get your hopes up');

		https.get(url, function(res) {
			var body = '';

			res.on('data', function(chunk) {
				body += chunk;
			});

			res.on('close', () => {
				var APIresponse = JSON.parse(body);

				if (!APIresponse.setup || !APIresponse.punchline) return sendError('API reponse invalid');
				jokeEmbed.setTitle(APIresponse.setup)
				jokeEmbed.setDescription(`||${APIresponse.punchline}||`)

				if (msg.deletable) msg.delete();
				message.channel.send({ embeds: [jokeEmbed] }).catch(e => {
					console.log(`kek ${e}`)
				});
			});
		}).on('error', function(e) {
			sendError(e);
		});

		function sendError(e) {
			if (msg.deletable) msg.delete();
			new Tantrum(client, 'joke.js', 'API did not respond', e);
			message.channel.send({ content: '', embeds: [new Discord.MessageEmbed().setDescription(`So uh the API doesn't wanna talk rn`).setColor(tofuError)] }).catch(f => {
				new Tantrum(client, 'joke.js', 'Error on sending error embed', f);
			});
		}
	},
};
