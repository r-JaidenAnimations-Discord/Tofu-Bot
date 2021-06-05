const Tantrum = require('#tantrum');
const { checkMusic, checkQueueExists } = require('#functions/musicChecks.js');

module.exports = {
	name: 'queue',
	helpTitle: 'Queue',
	category: 'Music',
	usage: 'queue',
	description: 'See the upcoming choons',
	isDMAllowed: false,
	isDeprecated: false,
	isDangerous: false,
	aliases: ['q'],
	cooldown: 0,
	execute: async function(client, message, args) {

		if (!checkMusic(client, message)) return;
		if (!checkQueueExists(client, message)) return;

		const queue = client.player.getQueue(message);

		let currtr = `Current track: ${queue.playing.title}`;
		let trlist = queue.tracks.map((track, i) => {
			return `${i + 1}) ${track.title}    ${track.duration}`;
		}).slice(0, 8).join('\n') // For now, only the first 8 tracks get pulled
		let footer = `${queue.tracks.length > 8 ? `${queue.tracks.length - 8} more track(s)` : '     This is the end of the queue!'}`;

		try {
			message.channel.send(`\`\`\`nim\n${currtr}\n\n${trlist}\n${footer}\n\`\`\``); //TODO: pagination
		} catch (e) {
			throw new Tantrum(client, 'queue.js', 'Error on sending queue', e);
		}
	},
};
