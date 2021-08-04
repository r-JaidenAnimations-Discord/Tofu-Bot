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
	isDeprecated: false,
	isDangerous: false,
	isHidden: false,
	//aliases: [],
	cooldown: 0,
	execute: async function(client, message, args) {
		if (!checkMusic(client, message)) return;
		if (!checkQueueExists(client, message)) return;

		const queue = client.player.getQueue(message.guild);

		// Just like in pause.js, there is no 'paused' property yet
		// if (!client.player.getQueue(message).paused) {
		// 	let alreadyPlayingEmbed = new Discord.MessageEmbed()
		// 		.setColor(tofuOrange)
		// 		.setDescription('The music is already playing!');

		// 	return message.channel.send({ embeds: [alreadyPlayingEmbed] }).catch(e => { // TODO: Embedify and test
		// 		throw new Tantrum(client, 'resume.js', 'Error on sending alreadyPlayingEmbed', e)
		// 	});
		// }

		if (queue.setPaused(false)) {
			await message.react('▶️').catch(e => {
				throw new Tantrum(client, 'resume.js', 'Error on reacting resume', e)
			});
		} else {
			throw new Tantrum(client, 'resume.js', 'Error on resuming', 'No message');
		}
	},
};
