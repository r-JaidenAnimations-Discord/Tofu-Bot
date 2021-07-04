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
	isHidden: false,
	aliases: ['vol'],
	cooldown: 0,
	execute: async function(client, message, args) {

		if (!checkMessageStaff(client, message)) return;

		if (!checkMusic(client, message)) return;
		if (!checkQueueExists(client, message)) return;

		let volumeEmbed = new Discord.MessageEmbed();

		if (!args[0] || isNaN(args[0]) || args[0] === 'Infinity') {
			volumeEmbed.setColor(tofuOrange);
			volumeEmbed.setDescription('The value you inputted is not a valid number!');
			try {
				return message.channel.send(volumeEmbed); // TODO: Embedify and test
			} catch (e) {
				throw new Tantrum(client, 'volume.js', 'Error on sending volumeEmbed (invalid number)', e);
			}
		}

		if (Math.round(parseInt(args[0])) < 1 || Math.round(parseInt(args[0])) > 100) {
			volumeEmbed.setColor(tofuOrange);
			volumeEmbed.setDescription('Please enter a number between 1 and 100!');
			return message.channel.send(volumeEmbed).catch(e => { // TODO: Embedify and test
				throw new Tantrum(client, 'volume.js', 'Error on sending volumeEmbed (number not between 1 and 100)', e);
			});
		}

		const success = client.player.setVolume(message, parseInt(args[0]));

		if (success) {
			volumeEmbed.setColor(tofuGreen);
			volumeEmbed.setDescription(`Volume set to **${parseInt(args[0])}%**!`);
			message.channel.send(volumeEmbed).catch(e => { // TODO: Embedify and test
				throw new Tantrum(client, 'volume.js', 'Error on sending volumeEmbed (volume)', e);
			});
		} else {
			throw new Tantrum(client, 'volume.js', 'Error on setting volume', 'No message');
		}
	},
};
