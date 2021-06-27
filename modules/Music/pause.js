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
	isDeprecated: false,
	isDangerous: false,
	isHidden: false,
	//aliases: [],
	cooldown: 0,
	execute: async function(client, message, args) {

		if (!checkMusic(client, message)) return;
		if (!checkQueueExists(client, message)) return;

		if (client.player.getQueue(message).paused) {
			let alreadyPausedEmbed = new Discord.MessageEmbed()
				.setColor(tofuOrange)
				.setDescription('The music is already paused!');
			try {
				return message.channel.send(alreadyPausedEmbed);
			} catch (e) {
				throw new Tantrum(client, 'pause.js', 'Error on sending alreadyPausedEmbed', e);
			}
		}

		const success = client.player.pause(message);

		if (success) {
			try {
				await message.react('⏸');
			} catch (e) {
				throw new Tantrum(client, 'pause.js', 'Error on sending paused message', e);
			}
		} else {
			throw new Tantrum(client, 'pause.js', 'Error on pausing music', 'No message');
		}
	},
};
