const Discord = require('discord.js');
const { toggleHeyEnable } = require('../../functions/welcomeMsg.js');

module.exports = {
	name: 'Welcome',
	helpTitle: 'Welcome message',
	category: 'Bot',
	usage: 'welcome ({enable, disable})',
	description: 'Enable or Disable the welcome/bye message.',
	isEnabled: true,
	isDeprecated: false,
	aliases: ['announce'],
	cooldown: 0,
	execute: async function(client, message, args) {
		if (!message.member.hasPermission('BAN_MEMBERS')) return message.reply('You fool, need more permissions');

		// yeah it just does this
		toggleHeyEnable(client, message, args);
	},
};