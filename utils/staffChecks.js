const { teraID, maxID, gradyID, retainedID } = require('#memberIDs');
const { Permissions } = require('discord.js');
const Tantrum = require('#tantrum');

/**
 * Check if the message author can ban members
 * @param {Client} client Discord client
 * @param {Object} message Message object
 * @returns {Boolean} Returns true if message.author can ban members
 */
const checkBanStaff = (client, message, returnMessage) => {
	if (!message.member.permissions.has(Permissions.FLAGS.BAN_MEMBERS)) {
		if (returnMessage) message.channel.send('You fool, need more permissions').catch(e => { throw new Tantrum(client, 'staffChecks.js', 'Error while sending ban permission message', e) });
		return false;
	}
	return true;
}

/**
 * Check if the message author can manage messages
 * @param {Client} client Discord client
 * @param {Object} message Message object
 * @returns {Boolean} Returns true if message.author can manage messages
 */
const checkMessageStaff = (client, message, returnMessage) => {
	if (!message.member.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES)) {
		if (returnMessage) message.channel.send('You fool, need more permissions').catch(e => { throw new Tantrum(client, 'staffChecks.js', 'Error while sending message permission message', e) });
		return false;
	}
	return true;
}

/**
 * Check if the message author is one of the masters
 * @param {Client} client Discord client
 * @param {*} message Message object
 * @returns {Boolean} Returns true if message.author is one of the masters
 */
const masterCheck = (client, message) => {
	if (message.author.id !== teraID && message.author.id !== maxID && message.author.id !== gradyID && message.author.id !== retainedID) {
		message.channel.send('No dude. I don\'t want anyone but my masters mess with code in the bot...').catch(e => {
			throw new Tantrum(client, 'staffChecks.js', 'Error while sending master permission message', e);
		});
		return false;
	}
	return true;
}
module.exports = {
	checkBanStaff,
	checkMessageStaff,
	masterCheck
}
