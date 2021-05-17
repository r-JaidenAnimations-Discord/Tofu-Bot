const { tofuOrange } = require('../../config.json');
const Discord = require('discord.js');
const Tantrum = require('../../functions/tantrum.js');
const { checkMusic, checkQueueExists } = require('../../functions/musicChecks.js');

module.exports = {
	name: 'resume',
	helpTitle: 'Resume',
	category: 'Music',
	usage: 'resume',
	description: 'Alr back, go on',
	isDMAllowed: false,
	isDeprecated: false,
	//aliases: [],
	cooldown: 0,
	execute: async function(client, message, args) {

		if (!checkMusic(client, message)) return;
		if (!checkQueueExists(client, message)) return;

		if (!client.player.getQueue(message).paused) {
			let alreadyPlayingEmbed = new Discord.MessageEmbed()
				.setColor(tofuOrange)
				.setDescription('The music is already playing!');

			try {
				return message.channel.send(alreadyPlayingEmbed);
			} catch (e) {
				throw new Tantrum(client, 'resume.js', 'Error on sending alreadyPlayingEmbed', e);
			}
		}

		const success = client.player.resume(message);

		// We have to do this because of a bug in discord.js
		client.player.resume(message);
		client.player.pause(message);
		client.player.resume(message);

		if (success) {
			try {
				message.react('▶️');
			} catch (e) {
				throw new Tantrum(client, 'resume.js', 'Error on reacting resume', e);
			}
		} else {
			throw new Tantrum(client, 'resume.js', 'Error on resuming', 'No message');
		}
	},
};
