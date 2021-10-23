const Discord = require('discord.js');
const Tantrum = require('#tantrum');
const { tofuGreen } = require('#colors');

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
					// { name: 'Poker Night', value: 'poker' },
					{ name: 'Betrayal.io', value: 'betrayal' },
					{ name: 'Youtube Together', value: 'youtube' },
					{ name: 'Fishington.io', value: 'fishing' },
					{ name: 'Chess In The Park', value: 'chess' },
					// { name: 'CG 2 Dev', value: 'chessdev' }
				],
				required: true
			}
		],
		// defaultPermission: false
	},
	// staffOnly: true,
	execute: async (client, interaction) => {
		const game = interaction.options.get('game').value;
		client.groupActivities.createTogetherCode(interaction.options.get('channel').value, game).then(async invite => {
			const attachment = new Discord.MessageAttachment(`./assets/commandActivity/${game}.png`, 'activity.png');
			const activityEmbed = new Discord.MessageEmbed()
				.setTitle('Activity launched!')
				.setDescription(`[Click here to start it, after that you can use the invite embed below](${invite.code})`)
				.setColor(tofuGreen)
				.setThumbnail('attachment://activity.png')
				.setFooter('Note: Doesn\'t work on mobile')
				.setTimestamp();

			await interaction.reply({ embeds: [activityEmbed], files: [attachment] });
			return interaction.channel.send(`${invite.code}`);
		}).catch(async e => {
			return await interaction.reply('Something went wrong when creating the activity, i\'m sorry.\n*(The devs have been notified about this)*');
		});
	}
};
