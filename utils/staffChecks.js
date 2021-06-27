const Tantrum = require('#tantrum');

/**
 * Check if the message author can ban members
 * @param {Client} client Discord client
 * @param {Object} message Message object
 * @returns {Boolean} Returns true if message.author can ban members
 */
const checkBanStaff = (client, message) => {
	if (!message.member.hasPermission('BAN_MEMBERS')) {
		message.channel.send('You fool, need more permissions').catch(e => { throw new Tantrum(client, 'staffChecks.js', 'Error while sending ban permission message', e) });
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
const checkMessageStaff = (client, message) => {
	if (!message.member.hasPermission('MANAGE_MESSAGES')) {
		message.channel.send('You fool, need more permissions').catch(e => { throw new Tantrum(client, 'staffChecks.js', 'Error while sending message permission message', e) });
		return false;
	}
	return true;
}
module.exports = {
	checkBanStaff,
	checkMessageStaff
}
