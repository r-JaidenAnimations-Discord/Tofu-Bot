const fs = require('fs');
const Tantrum = require('../../functions/tantrum.js');
const { leaveMessages } = require('../../commanddata/greetings.json');
//const { jaidenServerID, generalChannelID, devMode, gradyID, maxID } = require('../../config.json');

module.exports = async (client, member) => {
	const { jaidenServerID, generalChannelID, devMode, gradyID, maxID } = client.config;

	if (member.guild.id !== jaidenServerID && devMode === false) return console.log('left but not jaidenserver');

	if (member.id === gradyID) {
		try {
			client.channels.cache.get(generalChannelID).send('GRADY, NOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO!');
			client.users.cache.get(maxID).send('Grady left, noooooooo');
		} catch (e) {
			throw new Tantrum(client, 'guildMemberRemove.js', 'Error on sending grady left message.', e);
		}
	}

	const data = await fs.readFileSync('./deployData/settings.json', 'utf-8');
	var settingsFile = JSON.parse(data);
	var welcomerState = settingsFile.welcome;

	if (welcomerState === false) return;
	try {
		let randomBye = leaveMessages[Math.floor(Math.random() * leaveMessages.length)];
		let formatBye = randomBye.replace('{user}', `**${member.displayName}**`);
		client.channels.cache.get(generalChannelID).send(formatBye);
	} catch (e) {
		throw new Tantrum(client, 'guildMemberRemove.js', 'Error on sending cya message', e);
	}
};
