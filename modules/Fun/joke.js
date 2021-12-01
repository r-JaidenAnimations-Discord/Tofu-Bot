const { tofuGreen, tofuError } = require('#colors');
const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');
const Tantrum = require('#tantrum');
const { loadingString } = require('#utils/funnyLoad.js');

module.exports = {
	name: 'joke',
	helpTitle: 'Joke',
	category: 'Fun',
	usage: 'joke',
	description: 'Bad jokes!',
	isDMAllowed: false,
	isDangerous: false,
	mainServerOnly: false,
	isHidden: false,
	// aliases: [],
	cooldown: 5,
	execute: async function(client, message, args) {
		const jokeEmbed = new MessageEmbed()
			.setColor(tofuGreen)
			.setTitle(loadingString())
			.setFooter('The API does not have good jokes, don\'t get your hopes up');

		const msg = await message.channel.send({ embeds: [jokeEmbed] });

		// API endpoint
		const url = 'https://official-joke-api.appspot.com/random_joke';

		const APIresponse = await fetch(url).then(r => r.json()).catch(e => {
			new Tantrum(client, e);
		});

		if (APIresponse?.setup && APIresponse?.punchline) {
			jokeEmbed.setTitle(APIresponse.setup);
			jokeEmbed.setDescription(`||${APIresponse.punchline}||`);
			return msg.edit({ embeds: [jokeEmbed] });
		}

		if (msg.deletable) msg.delete();

		return message.channel.send({ embeds: [new MessageEmbed().setDescription('So uh the API doesn\'t wanna talk rn').setColor(tofuError)] });
	},
};
