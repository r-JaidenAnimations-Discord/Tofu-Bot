const { gradyID, maxID } = require('#memberIDs');
const fs = require('fs');
const Tantrum = require('#tantrum');
const { leaveMessages } = require('#assets/greeting/greetings.json');

module.exports = async (client, member) => {
	const { jaidenServerID, generalChannelID, devMode } = client.config;

	if (member.guild.id !== jaidenServerID && devMode === false) return console.log('left but not jaidenserver');

	if (member.id === gradyID) {
		client.users.cache.get(maxID).send('Grady left, noooooooo');
	}

	const data = await fs.readFileSync('./deployData/settings.json', 'utf-8');
	const settingsFile = JSON.parse(data);
	const welcomerState = settingsFile.welcome.state;

	if (welcomerState === false) return;
	let randomBye = leaveMessages.randomElement();
	let formatBye = randomBye.replace('{user}', `**${member.displayName}**`);
	client.channels.cache.get(generalChannelID).send(formatBye);

};
