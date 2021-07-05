const { tofuOrange } = require('#colors');
const Discord = require('discord.js');
const Tantrum = require('#tantrum');
const { checkMusic, checkQueueExists } = require('#utils/musicChecks.js');

module.exports = {
	name: 'resume',
	helpTitle: 'Resume',
	category: 'Music',
	usage: 'resume',
	description: 'Alr back, go on',
	isDMAllowed: false,
	isDeprecated: false,
	isDangerous: false,
	isHidden: false,
	//aliases: [],
	cooldown: 0,
	execute: async function(client, message, args) {

		if (!checkMusic(client, message)) return;
		if (!checkQueueExists(client, message)) return;

		if (!client.player.getQueue(message).paused) {
			let alreadyPlayingEmbed = new Discord.MessageEmbed()
				.setColor(tofuOrange)
				.setDescription('The music is already playing!');

			return message.channel.send({ embeds: [alreadyPlayingEmbed] }).catch(e => { // TODO: Embedify and test
				throw new Tantrum(client, 'resume.js', 'Error on sending alreadyPlayingEmbed', e)
			});
		}

		const success = client.player.resume(message);

		// We have to do this because of a bug in discord.js
		client.player.resume(message);
		client.player.pause(message);
		client.player.resume(message);

		if (success) {
			await message.react('▶️').catch(e => {
				throw new Tantrum(client, 'resume.js', 'Error on reacting resume', e)
			});
		} else {
			throw new Tantrum(client, 'resume.js', 'Error on resuming', 'No message');
		}
	},
};
