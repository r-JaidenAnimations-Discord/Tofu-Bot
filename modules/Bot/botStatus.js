const { setSts } = require('#functions/statusFunction.js');
const { checkBanStaff } = require('#functions/staffChecks.js');

module.exports = {
	name: 'status',
	helpTitle: 'Status',
	category: 'Bot',
	usage: 'status [{random ({enable, disable}), online, idle, dnd, gone, stream, play, listen, randomuser, next}]',
	description: 'Set the client\'s status',
	isDMAllowed: false,
	isDeprecated: false,
	isDangerous: true,
	isHidden: false,
	aliases: ['sts', 'stat'],
	cooldown: 1,
	execute: async function(client, message, args) {
		if (!checkBanStaff(client, message)) return;

		// yeah it just does this
		setSts(client, message, args[0]);

		await message.react('✅');
	},
};
