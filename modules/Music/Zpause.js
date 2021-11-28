const { tofuOrange } = require('#colors');
const Discord = require('discord.js');
const Tantrum = require('#tantrum');
const { checkMusic, checkQueueExists } = require('#utils/musicChecks.js');

module.exports = {
	name: 'pause',
	helpTitle: 'Pause',
	category: 'Music',
	usage: 'pause',
	description: 'brb hold on',
	isDMAllowed: false,
	isDangerous: false,
	mainServerOnly: false,
	isHidden: false,
	// aliases: [],
	cooldown: 0,
	execute: async function(client, message, args) {
		if (!checkMusic(client, message)) return;
		if (!checkQueueExists(client, message)) return;

		const queue = client.player.getQueue(message.guild);

		if (queue.connection?.paused) {
			const alreadyPausedEmbed = new Discord.MessageEmbed()
				.setColor(tofuOrange)
				.setDescription('The music is already paused!');
			return message.channel.send({ embeds: [alreadyPausedEmbed] }).catch(e => {
				throw new Tantrum(client, 'pause.js', 'Error on sending alreadyPausedEmbed', e);
			});
		}

		if (queue.setPaused(true)) {
			await message.react('⏸').catch(e => {
				throw new Tantrum(client, 'pause.js', 'Error on sending paused message', e);
			});
		} else {
			throw new Tantrum(client, 'pause.js', 'Error on pausing music', 'No message');
		}
	},
};
