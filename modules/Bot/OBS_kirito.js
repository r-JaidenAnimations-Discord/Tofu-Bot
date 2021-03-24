const { gradyID, teraID, retainedID, maxID} = require('../../config.json');

module.exports = {
	name: 'kirito',
	helpTitle: 'Trust kirito',
	category: 'Hidden',
	usage: 'kirito',
	description: 'OBSOLETE\nEnable or Disable the kirito trust.',
	isEnabled: true,
	isDMAllowed: false,
	isDeprecated: false,
	//aliases: [],
	cooldown: 0,
	execute: async function(client, message, args) {
		if (message.author.id !== gradyID && message.author.id !== teraID && message.author.id !== retainedID && message.author.id !== maxID) return;

		return message.channel.send('This command has been moved, use the `settings` command to enable or disable the kirito trust settings');
	},
};