const { devMode, gradyID, maxID } = require('#memberIDs');
const fs = require('fs');
const Tantrum = require('#tantrum');
const { joinMessages } = require('#assets/greeting/greetings.json');

module.exports = async (client, member) => {
	const { jaidenServerID, generalChannelID, rulesChannelID } = client.config;

	if (member.guild.id !== jaidenServerID && devMode === false) return console.log('joined but not jaidenserver');

	if (member.id === gradyID) {
		try {
			// client.channels.cache.get(generalChannelID).send('GRADY, you\'re back!!!! omgomgomgomgomg');
			client.users.cache.get(maxID).send('GRADY IS BACK!!!!');
		} catch (e) {
			throw new Tantrum(client, 'guildMemberRemove.js', 'Error on sending grady joined message.', e);
		}
	}

	const data = await fs.readFileSync('./deployData/settings.json', 'utf-8');
	const settingsFile = JSON.parse(data);
	const welcomerState = settingsFile.welcome.state;

	if (welcomerState === false) return;
	let randomWelc = joinMessages[Math.floor(Math.random() * joinMessages.length)];
	let formatWelc = randomWelc.replace('{user}', `<@${member.id}>`);

	client.channels.cache.get(generalChannelID).send(`${formatWelc}\nPlease make sure to read <#${rulesChannelID}> and the pinned comments / topics for this and other channels.\nAnd for the context, Jaiden isn't here :p`).catch(e => {
		throw new Tantrum(client, 'guildMemberAdd.js', 'Error on sending welcome message', e);
	});
};
