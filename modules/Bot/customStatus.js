const Tantrum = require('#tantrum');
const { checkBanStaff } = require('#utils/staffChecks.js');

module.exports = {
	name: 'customstatus',
	helpTitle: 'Custom Status',
	category: 'Bot',
	usage: 'customstatus [{online, idle, dnd}] [{watch, play, listen}] [text]',
	description: 'Set the client\'s status',
	isDMAllowed: false,
	isDangerous: true,
	mainServerOnly: true,
	isHidden: false,
	aliases: ['csts', 'stat'],
	cooldown: 1,
	execute: async function(client, message, args) {
		if (!checkBanStaff(client, message, true)) return;

		let status;
		let activity;

		switch (args[0]) {
			case 'online':
			case 'idle':
			case 'dnd':
				status = args[0];
				break;
			default:
				return message.channel.send('You must enter the proper status.').catch(e => {
					throw new Tantrum(client, 'customStatus.js', 'Error on sending \'Enter proper status\' message', e);
				});
		}

		switch (args[1]) {
			case 'watch':
				activity = 'WATCHING';
				break;
			case 'play':
				activity = 'PLAYING';
				break;
			case 'listen':
				activity = 'LISTENING';
				break;
			default:
				return message.channel.send('You must enter the proper activity.').catch(e => {
					throw new Tantrum(client, 'customStatus.js', 'Error on sending \'Enter proper activity\' message', e);
				});
		}

		let textString = args.slice(2).join(' ');
		if (textString.length === 0) {
			return message.channel.send('You must enter text to show').catch(e => {
				throw new Tantrum(client, 'customStatus.js', 'Error on sending \'Enter text to show\' message');
			});
		}
		client.user.setPresence({
			status: `${status}`,
			activities: [{
				name: `${textString}`,
				type: `${activity}`
			}]
		});
		await message.react('✅');
	},
};
