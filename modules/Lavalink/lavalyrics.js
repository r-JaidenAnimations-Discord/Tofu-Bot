const Discord = require('discord.js');
const { tofuGreen, tofuError, tofuOrange } = require('#colors');
const Genius = require('genius-lyrics');
const LavaManager = require('#handlers/lavaManager.js');
const { loadingString } = require('#utils/funnyLoad.js');
const Pagination = require('#utils/pagination.js');

module.exports = {
	name: 'llyrics',
	helpTitle: 'Lyrics',
	category: 'Music',
	usage: 'lyrics',
	description: 'Sing along',
	isDMAllowed: false,
	isDangerous: false,
	mainServerOnly: false,
	isHidden: false,
	aliases: ['ly', 'lyr', 'lr'],
	cooldown: 0,
	execute: async function(client, message, args) {
		const { lyricsToken } = client.config;

		if (!LavaManager.vcChecks(client, message)) return;
		if (!LavaManager.nodeChecks(client, message)) return;
		if (!(await LavaManager.musicChecks(client, message))) return;
		const lyricsClient = new Genius.Client(lyricsToken);

		const player = await LavaManager.getPlayer(client, message);

		const lyricsEmbed = new Discord.MessageEmbed()
			.setTitle(`Lyrics for ${player.queue.current.title}`)
			.setColor(tofuOrange)
			.setDescription(loadingString());

		const sentMessage = await message.channel.send({ embeds: [lyricsEmbed] });

		let track = player.queue.current;
		if (!track) return;
		track = track.title.toLowerCase()
			.replace(/\(lyrics|lyric|official music video|official video hd|official video|audio|official|clip officiel|clip|extended|hq\)/g, '');

		const lyr = await lyricsClient.songs.search(track).then(x => x[0]);

		const lyricsText = await lyr.lyrics().catch(e => {
			lyricsEmbed.setColor(tofuError);
			lyricsEmbed.setDescription('No lyrics were found. sad');
			sentMessage.edit({ embeds: [lyricsEmbed] });
			return false;
		});
		if (lyricsText) {
			const lyricsChunks = Pagination.generateChunks(lyricsText, 1024);
			lyricsEmbed.setColor(tofuGreen);
			lyricsEmbed.setDescription(`${lyricsChunks[0]}`);
			lyricsEmbed.setFooter(`Page 1 of ${lyricsChunks.length}.`);
			sentMessage.edit({ embeds: [lyricsEmbed] });
			if (lyricsChunks.length > 1) await Pagination.paginate(sentMessage, message.author, lyricsChunks);
		}

	},
};
