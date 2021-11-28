const Tantrum = require('#tantrum');
const LavaManager = require('#handlers/lavaManager.js');

module.exports = {
	name: 'lqueue',
	helpTitle: 'Queue',
	category: 'Music',
	usage: 'queue',
	description: 'See the upcoming choons',
	isDMAllowed: false,
	isDangerous: false,
	mainServerOnly: false,
	isHidden: false,
	aliases: ['q'],
	cooldown: 0,
	execute: async function(client, message, args) {
		if (!LavaManager.vcChecks(client, message)) return;
		if (!LavaManager.nodeChecks(client, message)) return;
		if (!(await LavaManager.musicChecks(client, message))) return;

		const player = await LavaManager.getPlayer(client, message);
		LavaManager.lavaLog(player.queue.tracks);
		const currtr = `Current track: ${player.queue.current.title}`;
		const trlist = player.queue.tracks.map((track, i) => {
			return `${i + 1}) ${track.title}    ${track.length}`;
		}).slice(0, 15).join('\n'); // For now, only the first 15 tracks get pulled
		const footer = `${player.queue.tracks.length > 8 ? `${queue.tracks.length - 8} more track(s)` : '     This is the end of the queue!'}`;

		message.channel.send(`\`\`\`nim\n${currtr}\n\n${trlist}\n${footer}\n\`\`\``).catch(e => {
			throw new Tantrum(client, 'queue.js', 'Error on sending queue', e);
		}); // TODO: pagination
	},
};
