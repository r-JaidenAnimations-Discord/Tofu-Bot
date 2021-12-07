const { MessageEmbed, MessageAttachment } = require('discord.js');
const { tofuGreen } = require('#colors');
const Tantrum = require('#tantrum');

module.exports = {
	data: {
		name: 'activity',
		description: 'Play some voice channel activities',
		options: [
			{
				name: 'channel',
				description: 'Where do we want to play',
				type: 'CHANNEL',
				required: true
			},
			{
				name: 'game',
				description: 'What game to play',
				type: 'STRING',
				choices: [
					{ name: 'Betrayal.io', value: 'betrayal' },
					{ name: 'Watch Together', value: 'youtube' },
					// { name: 'Watch Together Dev', value: 'youtubedev' },
					// { name: 'Poker Night', value: 'poker' },
					// { name: 'PN Dev', value: 'pokerdev' },
					{ name: 'Fishington.io', value: 'fishing' },
					{ name: 'Chess In The Park', value: 'chess' },
					// { name: 'CG 2 Dev', value: 'chessdev' }
					{ name: 'Doodle Crew', value: 'doodlecrew' },
					{ name: 'Letter Tile', value: 'lettertile' },
					{ name: 'Word Snacks', value: 'wordsnacks' },
					{ name: 'Awkword', value: 'awkword' },
					{ name: 'SpellCast', value: 'spellcast' },
					{ name: 'Checkers In The Park', value: 'checkers' },
					{ name: 'Sketchy Artist', value: 'sketchyartist' }
				],
				required: true
			}
		],
		// defaultPermission: false
	},
	// staffOnly: true,
	execute: async (client, interaction) => {
		const game = interaction.options.get('game').value;
		await interaction.deferReply();
		client.groupActivities.createAppInvite(interaction.options.get('channel').value, game).then(async invite => {
			const attachment = new MessageAttachment(`./assets/commandActivity/${game}.png`, 'activity.png');
			const activityEmbed = new MessageEmbed()
				.setTitle('Activity launched!')
				.setDescription(`[Click here to start it, after that you can use the invite embed below](${invite.code})`)
				.setColor(tofuGreen)
				.setThumbnail('attachment://activity.png')
				.setFooter('Note: Doesn\'t work on mobile yet')
				.setTimestamp();

			await interaction.editReply({ embeds: [activityEmbed], files: [attachment] });
			return interaction.channel.send(`${invite.code}`);
		}).catch(async e => {
			new Tantrum(client, e);
			return await interaction.editReply('Something went wrong when creating the activity, i\'m sorry.');
		});
	}
};
