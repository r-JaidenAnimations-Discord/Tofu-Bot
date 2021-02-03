const Discord = require('discord.js');
const { toggleAliTrust } = require('../../functions/aliTrust.js');
const { gradyID, retainedID, teraID, maxID } = require('../../config.json');

module.exports = {
	name: 'cringe',
	helpTitle: 'Trust Ali',
	category: 'Hidden',
	usage: 'cringe ({enable, disable})',
	description: 'Enable or Disable the ali trust.',
	isEnabled: true,
	isDeprecated: false,
	aliases: ['ali'],
	cooldown: 0,
	execute: async function(client, message, args) {
		if (message.author.id !== gradyID && message.author.id !== teraID && message.author.id !== retainedID && message.author.id !== maxID) return console.log('no');

		// yeah it just does this
		toggleAliTrust(client, message, args);
		
		if (message.deletable) message.delete();
		//message.react('✅');
	},
};