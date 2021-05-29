//const { tofuOrange } = require('../../config.json');
const Discord = require('discord.js');
const Tantrum = require('../../functions/tantrum.js');
const { checkMusic } = require('../../functions/musicChecks.js');

module.exports = {
	name: 'search',
	helpTitle: 'Search',
	category: 'Music',
	usage: 'search [query]',
	description: 'Don\'t know the exact thing? Search and choose the one you want.',
	isDMAllowed: false,
	isDeprecated: false,
	isDangerous: false,
	aliases: ['src', 'find'],
	cooldown: 0,
	execute: async function(client, message, args) {
		const { tofuOrange } = client.config;

		if (!checkMusic(client, message)) return;

		try {
			if (!args[0]) {
				let noQueryEmbed = new Discord.MessageEmbed()
					.setColor(tofuOrange)
					.setDescription('To find a song to play, you need to specify which song you want to play!');

				message.channel.send(noQueryEmbed);
				return;
			}
		} catch (e) {
			throw new Tantrum(client, 'search.js', 'Error on sending no query defined message', e);
		}

		client.player.play(message, args.join(' '));
	},
};
