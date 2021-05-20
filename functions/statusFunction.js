//const Discord = require('discord.js');
const fs = require('fs');
const Tantrum = require('./tantrum.js');
//const { jaidenServerID, level20RoleID } = require('../config.json');

// Set the bot's status
const setSts = (client, message, selectedStatus) => {
	const { jaidenServerID, level20RoleID } = client.config;

	let youOrJaiden = Math.random() < 0.5 ? 'you' : 'Jaiden';
	switch (/*this.*/selectedStatus) { // lmao, i fucking hate this.
		case 'online':
			client.user.setPresence({
				status: 'online',
				activity: {
					name: youOrJaiden,
					type: 'WATCHING'
				}
			});
			break;
		case 'idle':
			client.user.setPresence({
				status: 'idle',
				activity: {
					name: `${youOrJaiden} but half asleep`,
					type: 'WATCHING'
				}
			});
			break;
		case 'dnd':
			client.user.setPresence({
				status: 'dnd',
				activity: {
					name: `${youOrJaiden} but in a meeting`,
					type: 'WATCHING'
				}
			});
			break;
		case 'gone':
			client.user.setPresence({
				status: 'invisible',
				activity: {
					name: 'or am i?',
					type: 'WATCHING'
				}
			});
			break;
		case 'stream':
			client.user.setPresence({
				status: 'online',
				activity: {
					name: 'something',
					type: 'STREAMING',
					url: 'https://www.youtube.com/watch?v=raTkZqz680Y'
				}
			});
			break;
		case 'play':
			client.user.setPresence({
				status: 'online',
				activity: {
					name: 'with Ari Bot',
					type: 'PLAYING'
				}
			});
			break;
		case 'listen':
			client.user.setPresence({
				status: 'online',
				activity: {
					name: 'Grady\'s Playlist',
					type: 'LISTENING'
				}
			});
			break;
		case 'next':
			const nextState = states[Math.floor(Math.random() * states.length)];
			setSts(client, message, nextState);
			break;
		case 'randomuser':

			let memberList = client.guilds.cache.get(jaidenServerID).roles.cache.get(level20RoleID).members.map(m => m.displayName);
			let randomMember = memberList[Math.floor(Math.random() * memberList.length)];

			// We don't want to have the bot appear offline
			const simpleStates = ['online', 'idle', 'dnd'];
			let randomSimpleState = simpleStates[Math.floor(Math.random() * simpleStates.length)];

			client.user.setPresence({
				status: randomSimpleState,
				activity: {
					name: randomMember,
					type: 'WATCHING'
				}
			});
			break;
		default:
			try {
				return message.channel.send('Invalid argument given');
			} catch (e) {
				throw new Tantrum(client, 'statusFunction.js', 'Error on sending invalid status argument message', e);
			}
	}
}

// We don't want to have the bot appear offline
const states = ['online', 'idle', 'dnd', /*'gone', */'stream', 'play', 'listen', 'randomuser'];
const randomStatus = async (client, message) => {
	// Fetch the settings JSON file and pull it's randomStatus string
	const data = await fs.readFileSync('./deployData/settings.json', 'utf-8');
	var settingsFile = JSON.parse(data);

	if (settingsFile.randomStatus === true) {
		const nextState = states[Math.floor(Math.random() * states.length)];
		setSts(client, message, nextState);
		//console.log('[RAND] Enabled, set');
	}
	/*else {
		console.log('[RAND] Disabled');
	}*/
}

module.exports = {
	setSts,
	randomStatus
};
