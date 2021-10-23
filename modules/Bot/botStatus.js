const { setSts } = require('#utils/statusFunction.js');
const { checkBanStaff } = require('#utils/staffChecks.js');

module.exports = {
	name: 'status',
	helpTitle: 'Status',
	category: 'Bot',
	usage: 'status [{random ({enable, disable}), online, idle, dnd, gone, stream, play, listen, randomuser, next}]',
	description: 'Set the client\'s status',
	isDMAllowed: false,
	isDangerous: true,
	mainServerOnly: true,
	isHidden: false,
	aliases: ['sts', 'stat'],
	cooldown: 1,
	execute: async function(client, message, args) {
		if (!checkBanStaff(client, message, true)) return;

		switch (args[0]) {
			case 'online':
			case 'idle':
			case 'dnd':
			case 'gone':
			case 'stream':
			case 'play':
			case 'listen':
			case 'walle':
			case 'wall-e':
			case 'next':
			case 'randomuser':
				// yeah it just does this
				if (!setSts(client, args[0])) {
					return message.channel.send('Something went wrong');
				}
				await message.react('✅');
				break;
			default:
				return message.channel.send('Invalid argument given');
		}
	},
};
