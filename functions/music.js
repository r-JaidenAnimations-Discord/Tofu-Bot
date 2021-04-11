const canModifyQueue = (member) => {
	const { channelID } = member.voice;
	const botChannel = member.guild.voice.channelID;

	if (channelID !== botChannel) {
		return;
	}

	return true;
};

module.exports = {
	canModifyQueue
}
