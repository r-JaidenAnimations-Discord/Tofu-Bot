const { tofuGreen, tofuOrange } = require('#colors');
const Discord = require('discord.js');
const Tantrum = require('#tantrum');
const { checkMusic, checkQueueExists } = require('#utils/musicChecks.js');
const { checkMessageStaff } = require('#utils/staffChecks.js');

module.exports = {
	name: 'volume',
	helpTitle: 'Volume',
	category: 'Music',
	usage: 'volume [number between 0 and 100]',
	description: 'Change the player\'s volume',
	isDMAllowed: false,
	isDeprecated: false,
	isDangerous: false,
	mainServerOnly: false,
	isHidden: false,
	aliases: ['vol'],
	cooldown: 0,
	execute: async function(client, message, args) {
		if (!checkMessageStaff(client, message, true)) return;

		if (!checkMusic(client, message)) return;
		if (!checkQueueExists(client, message)) return;

		const queue = client.player.getQueue(message.guild);

		const volumeEmbed = new Discord.MessageEmbed();

		if (!args[0] || isNaN(args[0]) || args[0] === 'Infinity') {
			volumeEmbed.setColor(tofuOrange);
			volumeEmbed.setDescription('The value you entered is not a number');
			return message.channel.send({ embeds: [volumeEmbed] }).catch(e => {
				throw new Tantrum(client, 'volume.js', 'Error on sending volumeEmbed (invalid number)', e);
			});
		}

		if (Math.round(parseInt(args[0])) < 1 || Math.round(parseInt(args[0])) > 100) {
			volumeEmbed.setColor(tofuOrange);
			volumeEmbed.setDescription('Please enter a number between 1 and 100!');
			return message.channel.send({ embeds: [volumeEmbed] }).catch(e => {
				throw new Tantrum(client, 'volume.js', 'Error on sending volumeEmbed (number not between 1 and 100)', e);
			});
		}

		if (queue.setVolume(parseInt(args[0]))) {
			volumeEmbed.setColor(tofuGreen);
			volumeEmbed.setDescription(`Volume set to **${parseInt(args[0])}%**!`);
			message.channel.send({ embeds: [volumeEmbed] }).catch(e => {
				throw new Tantrum(client, 'volume.js', 'Error on sending volumeEmbed (volume)', e);
			});
		} else {
			throw new Tantrum(client, 'volume.js', 'Error on setting volume', 'No message');
		}
	},
};
