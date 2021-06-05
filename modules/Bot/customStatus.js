//const Discord = require('discord.js');
const Tantrum = require('#tantrum');

module.exports = {
	name: 'customstatus',
	helpTitle: 'Custom Status',
	category: 'Bot',
	usage: 'customstatus [{online, idle, dnd}] [{watch, play, listen}] [text]',
	description: 'Set the client\'s status',
	isDMAllowed: false,
	isDeprecated: false,
	isDangerous: true,
	aliases: ['csts', 'stat'],
	cooldown: 1,
	execute: async function(client, message, args) {
		if (!message.member.hasPermission('BAN_MEMBERS')) {
			try {
				return message.reply('You fool, need more permissions');
			} catch (e) {
				throw new Tantrum(client, 'customStatus.js', 'Error on sending permission error', e);
			}
		}

		let status;
		let activity;

		if (args[0] === 'online') {
			status = 'online';
		}
		else if (args[0] === 'idle') {
			status = 'idle';
		}
		else if (args[0] === 'dnd') {
			status = 'dnd';
		}
		else {
			try {
				return message.channel.send('You must enter the proper status.');
			} catch (e) {
				throw new Tantrum(client, 'customStatus.js', 'Error on sending \'Enter proper status\' message');
			}
		}

		if (args[1] === 'watch') {
			activity = 'WATCHING';
		}
		//else if (args[1] == 'stream') {
		//	activity = 'STREAMING';
		//}
		else if (args[1] === 'play') {
			activity = 'PLAYING';
		}
		else if (args[1] === 'listen') {
			activity = 'LISTENING';
		}
		else {
			try {
				return message.channel.send('You must enter the proper activity.');
			} catch (e) {
				throw new Tantrum(client, 'customStatus.js', 'Error on sending \'Enter proper activity\' message');
			}
		}
		let textString = args.slice(2).join(' ');
		if (textString.length === 0) {
			try {
				return message.channel.send('You must enter text to show');
			} catch (e) {
				throw new Tantrum(client, 'customStatus.js', 'Error on sending \'Enter text to show\' message');
			}
		}
		client.user.setPresence({
			status: `${status}`,
			activity: {
				name: `${textString}`,
				type: `${activity}`
			}
		});
		await message.react('✅');
	},
};
