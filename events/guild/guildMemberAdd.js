const { devMode, gradyID, maxID } = require('#memberIDs');
const fs = require('fs');
const { joinMessages } = require('#assets/greeting/greetings.json');

module.exports = async (client, member) => {
	const { jaidenServerID, generalChannelID, rulesChannelID } = client.config;

	if (member.guild.id !== jaidenServerID && devMode === false) return console.log('joined but not jaidenserver');

	if (member.id === gradyID) {
		client.users.cache.get(maxID).send('GRADY IS BACK!!!!');
	}

	const data = await fs.readFileSync('./deployData/settings.json', 'utf-8');
	const settingsFile = JSON.parse(data);
	const welcomerState = settingsFile.welcome.state;

	if (welcomerState === false) return;
	const randomWelc = joinMessages.randomElement();
	const formatWelc = randomWelc.replace('{user}', `<@${member.id}>`);

	client.channels.cache.get(generalChannelID).send(`${formatWelc}\nPlease make sure to read <#${rulesChannelID}> and the pinned comments / topics for this and other channels.\nAnd for the context, Jaiden isn't here :p`);
};
