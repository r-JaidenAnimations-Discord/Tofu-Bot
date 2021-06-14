// TODO: Error handling

const checkBanStaff = (client, message) => {
	if (!message.member.hasPermission('BAN_MEMBERS')) {
		message.channel.send('You fool, need more permissions');
		return false;
	}
	return true;
}

const checkMessageStaff = (client, message) => {
	if (!message.member.hasPermission('MANAGE_MESSAGES')) {
		message.channel.send('You fool, need more permissions');
		return false;
	}
	return true;
}
module.exports = {
	checkBanStaff,
	checkMessageStaff
}
