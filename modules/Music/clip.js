const Tantrum = require('../../functions/tantrum.js');
const { musicStrings } = require('../../commanddata/strings.json');

module.exports = {
	name: 'clip',
	helpTitle: 'Clip',
	category: 'Music',
	usage: 'clip [name]',
	description: 'Plays a clip sound',
	isDMAllowed: false,
	isDeprecated: false,
	//aliases: [],
	cooldown: 0,
	execute: async function(client, message, args) {
		const { channel } = message.member.voice;
		const queue = message.client.queue.get(message.guild.id);

		if (!args.length) {
			try {
				return message.channel.send('You didn\'t provide a clip.');
			} catch (e) {
				console.error(e);
				new Tantrum(client, 'clip.js', 'Error on sending no clip provided message', e);
				return;
			}
		}

		if (queue) {
			try {
				return message.channel.send('Can\'t play clip because there is an active queue.');
			} catch (e) {
				console.error(e);
				new Tantrum(client, 'clip.js', 'Error on sending can\'t play message');
				return;
			}
		}

		if (!channel) {
			try {
				return message.channel.send(musicStrings.notInChannel);
			} catch (e) {
				console.error(e);
				new Tantrum(client, 'clip.js', 'Error on sending not in channel message', e);
			}
		}

		const queueConstruct = {
			textChannel: message.channel,
			channel,
			connection: null,
			songs: [],
			loop: false,
			volume: 100,
			playing: true
		};

		message.client.queue.set(message.guild.id, queueConstruct);

		try {
			queueConstruct.connection = await channel.join();
			const dispatcher = queueConstruct.connection
				.play(`./commanddata/musicClips/${args[0]}.mp3`)
				.on('finish', () => {
					message.client.queue.delete(message.guild.id);
					channel.leave();
				})
				.on('error', err => {
					message.client.queue.delete(message.guild.id);
					channel.leave();
					console.error(err);
					new Tantrum(client, 'clip.js', 'Error on pulling clip.', err);
				});
		} catch (e) {
			console.error(e);
			new Tantrum(client, 'clip.js', 'Error on establishing VC connection', e);
		}
	},
};
