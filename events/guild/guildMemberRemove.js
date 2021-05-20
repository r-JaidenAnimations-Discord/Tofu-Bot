const fs = require('fs');
const Tantrum = require('../../functions/tantrum.js');
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

	// tried it in a separate file, didn't work, this is my botch
	const byes = [
		`Welps, guess like **${member.displayName}** couldn't stand to be around us, adiós.`,
		`**${member.displayName}** is hanging up now, bye.`
	];

	if (welcomerState === false) return;
	try {
		let randomBye = byes[Math.floor(Math.random() * byes.length)];
		client.channels.cache.get(generalChannelID).send(randomBye);
	} catch (e) {
		throw new Tantrum(client, 'guildMemberRemove.js', 'Error on sending cya message', e);
	}
};
