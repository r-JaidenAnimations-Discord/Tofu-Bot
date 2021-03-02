const Discord = require('discord.js');
const { gradyID, retainedID, maxID } = require('../../config.json');

module.exports = {
	name: 'fart',
	helpTitle: 'Fart',
	category: 'Hidden',
	usage: 'fart',
	description: 'Because Grady be funni.',
	isEnabled: true,
	isDMAllowed: false,
	isDeprecated: true,
	//aliases: [],
	cooldown: 0,
	execute: async function(client, message, args) {
	 ///if (!message.member.hasPermission('BAN_MEMBERS')) return;
	 if (message.author.id !== gradyID && message.author.id !== retainedID && message.author.id !== maxID) return;

	 message.channel.send('💨');
	 message.react('💨');
	},
};