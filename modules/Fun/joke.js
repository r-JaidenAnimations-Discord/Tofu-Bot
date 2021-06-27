const { tofuGreen, tofuError } = require('#colors');
const Discord = require('discord.js');
const https = require('https');
const fs = require('fs');
const Tantrum = require('#tantrum');

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
		message.channel.startTyping();

		// API endpoint
		var url = `https://official-joke-api.appspot.com/random_joke`;

		const jokeEmbed = new Discord.MessageEmbed()
			.setColor(tofuGreen)
			.setTimestamp();

		https.get(url, function(res) {
			var body = '';

			res.on('data', function(chunk) {
				body += chunk;
			});

			res.on('close', () => {
				console.log(body)
				var APIresponse = JSON.parse(body);

				jokeEmbed.setTitle(APIresponse.setup)
				jokeEmbed.setDescription(`||${APIresponse.punchline}||`)

				try {
					message.channel.stopTyping();
					message.channel.send(jokeEmbed);
				} catch (e) {
					console.log(`kek ${e}`)
				}

			});
			/*res.on('end', function() {
				// prob going to remove this
				console.log('Request finished');
			});*/
		}).on('error', function(e) {
			try {
				message.channel.stopTyping();
				message.channel.send(new Discord.MessageEmbed().setDescription(`So uh the API doesn't wanna talk rn`).setColor(tofuError));
				new Tantrum(client, 'joke.js', 'API did not respond', e);

			} catch (f) {
				new Tantrum(client, 'joke.js', 'Error on sending error embed', f);
			}
		});
	},
};