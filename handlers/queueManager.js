
const constructQueue = async (client, message) => {
	const queue = await client.player.createQueue(message.guild, {
		// i think this is the way

		leaveOnEnd: false,
		// leaveOnStop: null,
		// leaveOnEmpty: null,
		leaveOnEmptyCooldown: 10000,
		autoSelfDeaf: true,
		metadata: message
	});
	if (!queue.connection) await queue.connect(message.member.voice.channel).catch(e => {
		queue.destroy();
		new Tantrum(client, 'play.js', 'Error when connecting to vc', e);
		message.channel.send('Something went wrong when joining').catch(f => {
			throw new Tantrum(client, 'play.js', 'Error on sending failed to join message', f);
		});
		return false;
	});
	return queue;
}

module.exports = {
	constructQueue
}
