const { tofuGreen } = require('../../config.json');
const Discord = require('discord.js');
const Tantrum = require('../../functions/tantrum.js');
const { musicStrings } = require('../../commanddata/strings.json');

module.exports = {
	name: 'queue',
	helpTitle: 'Queue',
	category: 'Music',
	usage: 'queue',
	description: 'View what\'s coming up',
	isDMAllowed: false,
	isDeprecated: false,
	//aliases: [],
	cooldown: 0,
	execute: async function(client, message, args) {
		const permissions = message.channel.permissionsFor(message.client.user);
		if (!permissions.has(['MANAGE_MESSAGES', 'ADD_REACTIONS'])) {
			try {
				return message.channel.send('Missing permission to manage messages or add reactions');
			} catch (e) {
				throw new Tantrum(client, 'queue.js', 'Error on sending missing permission message', e);
			}
		}

		const queue = message.client.queue.get(message.guild.id);
		if (!queue) {
			try {
				return message.channel.send(musicStrings.noQueue);
			} catch (e) {
				throw new Tantrum(client, 'queue.js', 'Error on sending no queue message', e);
			}
		}

		let currentPage = 0;
		const embeds = generateQueueEmbed(message, queue.songs);

		const queueEmbed = await message.channel.send(
			`**Current Page -  ${currentPage + 1}/${embeds.length}**`,
			embeds[currentPage]
		);

		try {
			await queueEmbed.react('⬅️');
			await queueEmbed.react('⏹');
			await queueEmbed.react('➡️');
		} catch (error) {
			console.error(error);
			try {
				new Tantrum(client, 'queue.js', error.message, error);
				message.channel.send(error.message).catch(console.error);
			} catch (e) {
				new Tantrum(client, 'queue.js', 'Error on sending error message', e);
			}
		}

		const filter = (reaction, user) =>
			['⬅️', '⏹', '➡️'].includes(reaction.emoji.name) && message.author.id === user.id;
		const collector = queueEmbed.createReactionCollector(filter, { time: 60000 });

		collector.on('collect', async (reaction, user) => {
			try {
				if (reaction.emoji.name === '➡️') {
					if (currentPage < embeds.length - 1) {
						currentPage++;
						queueEmbed.edit(
							`**Current Page -  ${currentPage + 1}/${embeds.length}**`,
							embeds[currentPage]
						);
					}
				} else if (reaction.emoji.name === '⬅️') {
					if (currentPage !== 0) {
						--currentPage;
						queueEmbed.edit(
							`**Current Page -  ${currentPage + 1}/${embeds.length}**`,
							embeds[currentPage]
						);
					}
				} else {
					collector.stop();
					reaction.message.reactions.removeAll();
				}
				await reaction.users.remove(message.author.id);
			} catch (error) {
				console.error(error);
				new Tantrum(client, 'queue.js', error.message, error);
				try {
					return message.channel.send(error.message);
				} catch (e) {
					throw new Tantrum(client, 'queue.js', 'Error on sending error message', e);
				}
			}
		});
	}
};

function generateQueueEmbed(message, queue) {
	let embeds = [];
	let k = 10;

	for (let i = 0; i < queue.length; i += 10) {
		const current = queue.slice(i, k);
		let j = i;
		k += 10;

		const info = current.map((track) => `${++j} - [${track.title}](${track.url})`).join('\n');

		const embed = new Discord.MessageEmbed()
			.setTitle('Song Queue\n')
			.setThumbnail(message.guild.iconURL())
			.setColor(tofuGreen)
			.setDescription(`**Current Song - [${queue[0].title}](${queue[0].url})**\n\n${info}`)
			.setTimestamp();
		embeds.push(embed);
	}

	return embeds;

};
