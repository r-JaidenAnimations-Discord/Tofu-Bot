//const Discord = require('discord.js');

module.exports = {
	name: 'customstatus',
	helpTitle: 'Custom Status',
	category: 'Bot',
	usage: 'customstatus [{online, idle, dnd}] [{watch, play, listen}] [text]',
	description: 'Set the client\'s status',
	isEnabled: true,
	isDMAllowed: false,
	isDeprecated: false,
	aliases: ['csts', 'stat'],
	cooldown: 1,
	execute: async function(client, message, args) {
		if (!message.member.hasPermission('BAN_MEMBERS')) return message.reply('You fool, need more permissions');

		let status;
		let activity;

		if (args[0] == 'online') {
			status = 'online';
		}
		else if (args[0] == 'idle') {
			status = 'idle';
		}
		else if (args[0] == 'dnd') {
			status = 'dnd';
		}
		else {
			return message.channel.send('You must enter the proper status.');
		}

		if (args[1] == 'watch') {
			activity = 'WATCHING';
		}
		//else if (args[1] == 'stream') {
		//    activity = 'STREAMING';
		//}
		else if (args[1] == 'play') {
			activity = 'PLAYING';
		}
		else if (args[1] == 'listen') {
			activity = 'LISTENING';
		}
		else {
			return message.channel.send('You must enter the proper activity.');
		}
		let textString = args.slice(2).join(' ');
		if (textString.length == 0) {
			return message.channel.send('You must enter text to show');
		}
		client.user.setPresence({
			status: `${status}`,
			activity: {
				name: `${textString}`,
				type: `${activity}`
			}
		});
	},
};