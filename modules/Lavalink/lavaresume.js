const { tofuOrange } = require('#colors');
const Discord = require('discord.js');
const Tantrum = require('#tantrum');
const LavaManager = require('#handlers/lavaManager.js');

module.exports = {
	name: 'lresume',
	helpTitle: 'Resume',
	category: 'Music',
	usage: 'resume',
	description: 'Alr back, go on',
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

		if (!player.paused) {
			const alreadyPlayingEmbed = new Discord.MessageEmbed()
				.setColor(tofuOrange)
				.setDescription('The music is already playing!');
			return message.channel.send({ embeds: [alreadyPlayingEmbed] }).catch(e => {
				throw new Tantrum(client, 'resume.js', 'Error on sending alreadyPlayingEmbed', e);
			});
		}

		if (player.resume()) {
			await message.react('▶️').catch(e => {
				throw new Tantrum(client, 'resume.js', 'Error on sending resumed message', e);
			});
		} else {
			throw new Tantrum(client, 'resume.js', 'Error on resuming music', 'No message');
		}
	},
};
