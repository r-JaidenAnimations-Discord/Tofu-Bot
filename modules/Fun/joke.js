const { tofuGreen } = require('#colors');
const { MessageEmbed } = require('discord.js');
const jokes = require('#assets/commandJoke/jokes.json');

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
		const joke = jokes.randomElement();
		const jokeEmbed = new MessageEmbed()
			.setColor(tofuGreen)
			.setTitle(joke.setup)
			.setDescription(`||${joke.punchline}||`)
			.setFooter('These are not good jokes, don\'t get your hopes up');

		message.channel.send({ embeds: [jokeEmbed] });
	},
};
