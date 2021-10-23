const Tantrum = require('#tantrum');

/**
 * Creates a discord-player queue.
 * @param {Client} client Discord client
 * @param {Message} message Message Object
 * @returns {Queue|Bool} Returns generated queue if successful, or false if it fails.
 */
const constructQueue = async (client, message) => {
	const queue = await client.player.createQueue(message.guild, {
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
		message.channel.send('Something went wrong when joining');
		return false;
	});
	return queue;
};

module.exports = {
	constructQueue
};
