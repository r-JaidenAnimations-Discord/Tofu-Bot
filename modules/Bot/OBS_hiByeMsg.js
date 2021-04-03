module.exports = {
	name: 'welcome',
	helpTitle: 'Welcome message',
	category: 'Bot',
	usage: 'welcome',
	description: 'OBSOLETE\nEnable or Disable the welcome/bye message.',
	isEnabled: true,
	isDMAllowed: false,
	isDeprecated: false,
	aliases: ['announce', 'welcomer', 'greeting'],
	cooldown: 0,
	execute: async function(client, message, args) {
		if (!message.member.hasPermission('BAN_MEMBERS')) return message.reply('You fool, need more permissions');

		return message.channel.send('This command has been moved, use the `settings` command to enable or disable the welcome messager');
	},
};
