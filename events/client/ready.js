const Discord = require('discord.js');
const { randomStatus } = require('../../functions/statusFunction.js');
const { staffChatId } = require('../../config.json');
const { handleError } = require('../../functions/errorHandler.js');

module.exports = client => {
	randomStatus(client)
	console.log(`Alive as ${client.user.tag}`);

	try {
		//client.channels.cache.get(staffChatId).send(`I'm back b!tches!`);
	} catch (e) {
		return handleError(client, 'ready.js', 'Error on sending I\'m back', e);
	}

}