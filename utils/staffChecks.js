const { teraID, maxID, gradyID, retainedID } = require('#memberIDs');
const { Permissions } = require('discord.js');
const Tantrum = require('#tantrum');

/**
 * Check if the message author can ban members
 * @param {Client} client Discord client
 * @param {Message} message Message object
 * @param {Boolean} returnMessage whether a message needs to be returned
 * @returns {Boolean} Returns true if message.author can ban members
 */
const checkBanStaff = (client, message, returnMessage) => {
	if (!message.member.permissions.has(Permissions.FLAGS.BAN_MEMBERS)) {
		if (returnMessage) message.channel.send('You fool, need more permissions').catch(e => { throw new Tantrum(client, 'staffChecks.js', 'Error while sending ban permission message', e) });
		return false;
	}
	return true;
};

/**
 * Check if the message author can manage messages
 * @param {Client} client Discord client
 * @param {Message} message Message object
 * @param {Boolean} returnMessage whether a message needs to be returned
 * @returns {Boolean} Returns true if message.author can manage messages
 */
const checkMessageStaff = (client, message, returnMessage) => {
	if (!message.member.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES)) {
		if (returnMessage) message.channel.send('You fool, need more permissions').catch(e => { throw new Tantrum(client, 'staffChecks.js', 'Error while sending message permission message', e) });
		return false;
	}
	return true;
};

/**
 * Check if the message author is one of the masters
 * @param {Client} client Discord client
 * @param {Message} message Message object
 * @returns {Boolean} Returns true if message.author is one of the masters
 */
const masterCheck = (client, message) => {
	if (![teraID, maxID, gradyID].includes(message.author.id)) {
		message.channel.send('You are not worthy enough to use this command, **perish**').catch(e => {
			throw new Tantrum(client, 'staffChecks.js', 'Error while sending master permission message', e);
		});
		return false;
	}
	return true;
};
module.exports = {
	checkBanStaff,
	checkMessageStaff,
	masterCheck
};
