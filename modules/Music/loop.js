const { tofuGreen } = require('#colors');
const { MessageEmbed } = require('discord.js');
const LavaManager = require('#handlers/lavaManager.js');
const { LoopType } = require('@lavaclient/queue');

module.exports = {
	name: 'loop',
	helpTitle: 'Loop',
	category: 'Music',
	usage: 'loop',
	description: 'Toggle trough the looping modes',
	isDMAllowed: false,
	isDangerous: false,
	mainServerOnly: false,
	isHidden: false,
	aliases: ['lp', 'repeat'],
	cooldown: 0,
	execute: async function(client, message, args) {
		if (!LavaManager.vcChecks(client, message)) return;
		if (!LavaManager.nodeChecks(client, message)) return;
		if (!(await LavaManager.musicChecks(client, message))) return;

		const loopModes = {
			0: { type: LoopType.None, message: 'Looping is now **disabled**' },
			1: { type: LoopType.Queue, message: 'Now looping the **queue**' },
			2: { type: LoopType.Song, message: 'Now looping the **current track.**' }
		};

		const player = await LavaManager.getPlayer(client, message);

		const loopEmbed = new MessageEmbed()
			.setColor(tofuGreen);

		let loopMode = player.queue.loop.type;
		loopMode++;
		if (loopMode > 2) loopMode = 0;
		loopEmbed.setDescription(`${loopModes[loopMode].message}`);
		player.queue.setLoop(loopModes[loopMode].type);
		message.channel.send({ embeds: [loopEmbed] });
	},
};
