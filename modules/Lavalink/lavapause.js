const { tofuOrange } = require('#colors');
const Discord = require('discord.js');
const Tantrum = require('#tantrum');
const LavaManager = require('#handlers/lavaManager.js');

module.exports = {
	name: 'lpause',
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
		if (!LavaManager.vcChecks(client, message)) return;
		if (!LavaManager.nodeChecks(client, message)) return;
		if (!(await LavaManager.musicChecks(client, message))) return;

		const player = await LavaManager.getPlayer(client, message);
		if (!player) return;

		if (player.paused) {
			const alreadyPausedEmbed = new Discord.MessageEmbed()
				.setColor(tofuOrange)
				.setDescription('The music is already paused!');
			return message.channel.send({ embeds: [alreadyPausedEmbed] }).catch(e => {
				throw new Tantrum(client, 'pause.js', 'Error on sending alreadyPausedEmbed', e);
			});
		}

		try {
			await player?.pause();
			await message.react('⏸').catch(e => {
				throw new Tantrum(client, 'pause.js', 'Error on sending paused message', e);
			});
		} catch (e) {
			throw new Tantrum(client, 'pause.js', 'Error on pausing music', e);
		}
	},
};
