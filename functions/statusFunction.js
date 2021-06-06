const fs = require('fs');
const Tantrum = require('#tantrum');

// Set the bot's status
const setSts = (client, message, selectedStatus) => {
	const { jaidenServerID, level20RoleID } = client.config;

	let youOrJaiden = Math.random() < 0.5 ? 'you' : 'Jaiden';
	switch (/*this.*/selectedStatus) { // lmao, i fucking hate this.
		case 'online':
			setRPC(client, 'online', youOrJaiden, 'WATCHING');
			break;
		case 'idle':
			setRPC(client, 'idle', `${youOrJaiden} but half asleep`, 'WATCHING');
			break;
		case 'dnd':
			setRPC(client, 'dnd', `${youOrJaiden} but in a meeting`, 'WATCHING');
			break;
		case 'gone':
			setRPC(client, 'invisible', 'or am i?', 'WATCHING');
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
			setRPC(client, 'online', 'with Ari Bot', 'PLAYING');
			break;
		case 'listen':
			setRPC(client, 'online', 'Grady\'s Playlist', 'LISTENING');
			break;
		case 'walle':
		case 'wall-e':
			setRPC(client, 'online', 'Wall-E', 'WATCHING');
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

			setRPC(client, randomSimpleState, randomMember, 'WATCHING');
			break;
		default:
			try {
				return message.channel.send('Invalid argument given');
			} catch (e) {
				throw new Tantrum(client, 'statusFunction.js', 'Error on sending invalid status argument message', e);
			}
	}
}

const setRPC = async (client, activityStatus, activityName, activityType) => {
	client.user.setPresence({
		status: activityStatus,
		activity: {
			name: activityName,
			type: activityType
		}
	})
}

const states = ['online', 'idle', 'dnd', /*'gone', */'stream', 'play', 'listen', 'randomuser', 'wall-e']; // We don't want to have the bot appear offline
const randomStatus = async (client, message) => {
	// Fetch the settings JSON file and pull it's randomStatus string
	const data = await fs.readFileSync('./deployData/settings.json', 'utf-8');
	var settingsFile = JSON.parse(data);

	if (settingsFile.randomStatus === true) {
		const nextState = states[Math.floor(Math.random() * states.length)];
		setSts(client, message, nextState);
	}
}

module.exports = {
	setSts,
	randomStatus
};
