const { gradyID, teraID, retainedID, maxID} = require('../../config.json');

module.exports = {
	name: 'cringe',
	helpTitle: 'Trust Ali',
	category: 'Hidden',
	usage: 'cringe',
	description: 'OBSOLETE\nEnable or Disable the ali trust.',
	isEnabled: true,
	isDMAllowed: false,
	isDeprecated: false,
	aliases: ['ali'],
	cooldown: 0,
	execute: async function(client, message, args) {
		if (message.author.id !== gradyID && message.author.id !== teraID && message.author.id !== retainedID && message.author.id !== maxID) return console.log('no');

		return message.channel.send('This command has been moved, use the `settings` command to enable or disable the ali trust settings');
	},
};