const { masterCheck } = require('#utils/staffChecks.js');

module.exports = {
	name: 'fart',
	helpTitle: 'Fart',
	category: 'Fun',
	usage: 'fart',
	description: 'Because Grady be funni.',
	isDMAllowed: false,
	isDangerous: false,
	mainServerOnly: false,
	isHidden: true,
	cooldown: 5,
	execute: async function(client, message, args) {
		if (!masterCheck(client, message)) return;

		await message.react('💨');
	},
};
