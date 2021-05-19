const fs = require('fs');
const Tantrum = require('../../functions/tantrum.js');
//const { handleError } = require('../../functions/errorHandler.js');
//const { jaidenServerID, generalChannelID, rulesChannelID, devMode, gradyID, maxID } = require('../../config.json');

module.exports = async (client, member) => {
	const { jaidenServerID, generalChannelID, rulesChannelID, devMode, gradyID, maxID } = client.config;

	if (member.guild.id != jaidenServerID && devMode === false) return console.log('joined but not jaidenserver');

	if (member.id == gradyID) {
		try {
			client.channels.cache.get(generalChannelID).send('GRADY, you\'re back!!!! omgomgomgomgomg');
			client.users.cache.get(maxID).send('GRADY IS BACK!!!!');
		} catch (e) {
			//return handleError(client, 'guildMemberRemove.js', 'Error on sending grady joined message.', e);
			throw new Tantrum(client, 'guildMemberRemove.js', 'Error on sending grady joined message.', e)
		}
	}

	const data = await fs.readFileSync('./deployData/settings.json', 'utf-8');
	var settingsFile = JSON.parse(data);
	var welcomerState = settingsFile.welcome;

	// tried it in a separate file, didn't work, this is my botch
	const welcomes = [
		`<@${member.id}> burst through the window for welcome!`,
		`Hello, <@${member.id}>. Welcome to r/JaidenAnimations!`,
		`Hello, <@${member.id}>, still waiting for plont...`,
		`Hello <@${member.id}> grab a cup o' water and talk with us`
	];

	if (welcomerState === false) return;
	try {
		let randomWelc = welcomes[Math.floor(Math.random() * welcomes.length)];
		client.channels.cache.get(generalChannelID).send(`${randomWelc}\nPlease make sure to read <#${rulesChannelID}> and the pinned comments / topics for this and other channels.\nAnd for the context, Jaiden isn't here :p`);
		return;
	} catch (e) {
		//return handleError(client, 'guildMemberAdd.js', 'Error on sending welcome message', e);
		throw new Tantrum(client, 'guildMemberAdd.js', 'Error on sending welcome message', e)
	}
};
