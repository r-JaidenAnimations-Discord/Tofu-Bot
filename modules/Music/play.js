/**
 * Dear future me. Please forgive me. I can't even begin to express how sorry I am.
 */
//const { tofuOrange } = require('../../config.json');
const { tofuOrange } = require('#colors');
const Discord = require('discord.js');
const Tantrum = require('#tantrum');
const { checkMusic } = require('#functions/musicChecks.js');

module.exports = {
	name: 'play',
	helpTitle: 'Play',
	category: 'Music',
	usage: 'play [query]',
	description: 'Play some choons',
	isDMAllowed: false,
	isDeprecated: false,
	isDangerous: false,
	aliases: ['p'],
	cooldown: 0,
	execute: async function(client, message, args) {
		// const { tofuOrange } = client.config;

		if (!checkMusic(client, message)) return;

		if (client.player.getQueue(message)) {
			if (client.player.getQueue(message).paused && !args[0]) {
				const success = client.player.resume(message);

				// We have to do this because of a bug in discord.js
				//client.player.resume(message);
				client.player.pause(message);
				client.player.resume(message);

				if (success) {
					try {
						return await message.react('👌');
					} catch (e) {
						throw new Tantrum(client, 'play.js', 'Error on reacting resume', e);
					}
				} else {
					throw new Tantrum(client, 'play.js', 'Error on resuming', 'No message');
				}
			}
		}

		try {
			if (!args[0]) {
				let noQueryEmbed = new Discord.MessageEmbed()
					.setColor(tofuOrange)
					.setDescription('To play a song, you need to specify which song you want to play!');

				message.channel.send(noQueryEmbed);
				return;
			}
		} catch (e) {
			throw new Tantrum(client, 'play.js', 'Error on sending no query defined message', e);
		}

		await client.player.play(message, args.join(' '), { firstResult: true });
	},
};
