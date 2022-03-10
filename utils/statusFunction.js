const fs = require('fs');

/**
 * Set the bot's status
 * @param {Client} client Discord client
 * @param {String} selectedStatus Status that has to be set
 */
const setSts = (client, selectedStatus) => {
	const { jaidenServerID, level20RoleID } = client.config;

	const youOrJaiden = Math.random() < 0.5 ? 'you' : 'Jaiden';
	switch (/* this. */selectedStatus) { // lmao, i fucking hate this.
		case 'online':
			return setRPC(client, 'online', youOrJaiden, 'WATCHING');
		case 'idle':
			return setRPC(client, 'idle', `${youOrJaiden} but half asleep`, 'WATCHING');
		case 'dnd':
			return setRPC(client, 'dnd', `${youOrJaiden} but in a meeting`, 'WATCHING');
		case 'gone':
			return setRPC(client, 'invisible', 'or am i?', 'WATCHING');
		case 'stream':
			client.user.setPresence({
				status: 'online',
				activities: [{
					name: 'something',
					type: 'STREAMING',
					url: 'https://www.youtube.com/watch?v=raTkZqz680Y'
				}]
			});
			return true;
		case 'play':
			return setRPC(client, 'online', 'with Ari Bot', 'PLAYING');
		case 'listen':
			return setRPC(client, 'online', 'Grady\'s Playlist', 'LISTENING');
		case 'walle':
		case 'wall-e':
			return setRPC(client, 'online', 'Wall-E', 'WATCHING');
		case 'next':
			const nextState = states.randomElement();
			return setSts(client, nextState);
		case 'randomuser':
			const memberList = client.guilds.cache.get(jaidenServerID).roles.cache.get(level20RoleID).members.map(m => m.displayName);
			const randomMember = memberList.randomElement();

			// We don't want to have the bot appear offline
			const randomSimpleState = ['online', 'idle', 'dnd'].randomElement();

			return setRPC(client, randomSimpleState, randomMember, 'WATCHING');
		default:
			return false;
	}
};

/**
 * Actually does the DJS API call to set the client status
 * @param {Client} client Discord client
 * @param {String} activityStatus Presence status (idle, dnd, online, invisible)
 * @param {String} activityName Custom status, what goes behind the 'playing, watching,...'
 * @param {String} activityType Type of activity (playing, watching, streaming,...)
 */
const setRPC = async (client, activityStatus, activityName, activityType) => {
	client.user.setPresence({
		status: activityStatus,
		activities: [{
			name: activityName,
			type: activityType
		}]
	});
	return true;
};

const states = ['online', 'idle', 'dnd', /* 'gone', */'stream', 'play', 'listen', 'randomuser', 'wall-e']; // We don't want to have the bot appear offline
/**
 * Pick a random status and set it
 * @param {Client} client Discord client
 */
const randomStatus = async (client) => {
	// Fetch the settings JSON file and pull it's randomStatus string
	const data = await fs.readFileSync('./deployData/settings.json', 'utf-8');
	const settingsFile = JSON.parse(data);

	if (settingsFile.randomStatus.state) setSts(client, states.randomElement());
};

module.exports = {
	setSts,
	randomStatus
};
