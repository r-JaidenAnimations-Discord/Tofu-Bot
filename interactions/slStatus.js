const Tantrum = require('#tantrum');
const { setSts } = require('#utils/statusFunction.js');

module.exports = {
	data: {
		name: 'status',
		description: 'Make Tofu do stuffs',
		options: [
			{
				name: 'predefined',
				description: 'Predefined stuffs, more simple yesyes',
				type: 'SUB_COMMAND',
				options: [
					{
						name: 'status',
						description: 'Predefined commands',
						type: 'STRING',
						choices: [
							{ name: 'Online', value: 'online' },
							{ name: 'Idle', value: 'idle' },
							{ name: 'Streaming', value: 'stream' },
							{ name: 'Playing with Ari', value: 'play' },
							{ name: 'Listening to Grady\'s Playlist', value: 'listen' },
							{ name: 'Watching Wall-E', value: 'wall-e' },
							{ name: 'Watching random user', value: 'randomuser' },
							{ name: 'Random', value: 'next' }
						],
						required: true
					},

				]
			},
			{
				name: 'custom',
				description: 'Custom set',
				type: 'SUB_COMMAND',
				options: [
					{
						name: 'status',
						description: 'What status to show',
						type: 'STRING',
						choices: [
							{ name: 'Online', value: 'online' },
							{ name: 'Idle', value: 'idle' },
							{ name: 'Do not Disturb', value: 'dnd' }
						],
						required: true
					},
					{
						name: 'activity',
						description: 'What to put here idk',
						type: 'STRING',
						choices: [
							{ name: 'Watching...', value: 'WATCHING' },
							{ name: 'Playing...', value: 'PLAYING' },
							{ name: 'Listening to...', value: 'LISTENING' }
						],
						required: true
					},
					{
						name: 'text',
						description: 'Status text',
						type: 'STRING',
						required: true
					},
				]
			},
			{
				name: 'custom-stream',
				description: 'Custom funky stream link ( ͡° ͜ʖ ͡°)',
				type: 'SUB_COMMAND',
				options: [
					{
						name: 'text',
						description: 'Streaming what????????',
						type: 'STRING',
						required: true
					},
					{
						name: 'url',
						description: 'URL for the \'Watch Stream\' button',
						type: 'STRING',
						required: true
					}
				]
			}
		],
		defaultPermission: false
	},
	staffOnly: true,
	execute: async (client, interaction) => {
		switch (interaction.options._subcommand) {
			case 'predefined':
				if (setSts(client, interaction.options.getString('status'))) return await interaction.reply('All good!');
				await interaction.reply('Something went wrong');
				break;
			case 'custom':
				client.user.setPresence({
					status: interaction.options.getString('status'),
					activities: [{
						name: interaction.options.getString('text'),
						type: interaction.options.getString('activity')
					}]
				});
				await interaction.reply('All good!');
				break;
			case 'custom-stream':
				const url = interaction.options.getString('url');
				// Scary as always
				const youtubeRegex = /^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|v\/)?)([\w\-]+)(\S+)?$/;
				const twitchRegex = /^(?:https?:\/\/)?(?:www\.|go\.)?twitch\.tv\/([a-z0-9_]+)($|\?)/;
				if (!youtubeRegex.test(url) && !twitchRegex.test(url)) return await interaction.reply('You have to provide a valid Twitch or YouToob url');

				client.user.setPresence({
					status: 'online',
					activities: [{
						name: interaction.options.getString('text'),
						type: 'STREAMING',
						url
					}]
				});
				await interaction.reply('All good!');
				break;
			default:
				await interaction.reply('That\'s not supposed to happen..............');
				new Tantrum(client, 'slStatus.js', 'Invalid subcommand was sent', 'What more can i say');
				break;
		}
	}
};
