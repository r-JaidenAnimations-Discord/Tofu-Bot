const { tofuGreen, tofuOrange } = require('#colors');
const Discord = require('discord.js');
const Tantrum = require('#tantrum');
const { checkMusic } = require('#utils/musicChecks.js');

module.exports = {
	name: 'search',
	helpTitle: 'Search',
	category: 'Music',
	usage: 'search [query]',
	description: 'Don\'t know the exact thing? Search and choose the one you want.',
	isDeprecated: false,
	isDangerous: false,
	isHidden: false,
	aliases: ['src', 'find'],
	cooldown: 0,
	execute: async function(client, message, args) {
		message.channel.send('Search might or might not work propely yet');
		if (!checkMusic(client, message)) return;

		if (!args[0]) {
			const noQueryEmbed = new Discord.MessageEmbed()
				.setColor(tofuOrange)
				.setDescription('To find a song to play, you need to specify which song you want to play!');

			return message.channel.send({ embeds: [noQueryEmbed] }).catch(e => {
				throw new Tantrum(client, 'search.js', 'Error on sending no query defined message', e);
			});
		}

		const tracks = await client.player.search(args.join(' '), {
			requestedBy: message.author
		}).then(x => x.tracks);

		const searchResultString = tracks.map((t, i) => `${i + 1}) ${t.title}`).join('\n');

		message.channel.send(`\`\`\`nim\n${searchResultString}\n\`\`\``).catch(e => {
			throw new Tantrum(client, 'searchResults.js', 'Error on sending searchResults', e);
		}).then(async msg => {
			const filter = async (content) => {
				if (!isNaN(content) && parseInt(content) >= 1 && parseInt(content) <= tracks.length) {
					const index = parseInt(content, 10);
					const track = tracks[index - 1];
					const queue = client.player.createQueue(message.guild, {
						// i think this is the way

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
						message.channel.send('Something went wrong when joining').catch(f => {
							throw new Tantrum(client, 'play.js', 'Error on sending failed to join message', f);
						});
					});
					queue.addTrack(track);
					if (!queue.playing) await queue.play();
					return track;
				} else {
					const searchInvalidResponseEmbed = new Discord.MessageEmbed()
						.setColor(tofuOrange)
						.setDescription(`Response has to be a valid number between **1** and **${tracks.length}**! Search cancelled.`);
					msg.channel.send({ embeds: [searchInvalidResponseEmbed] });
				}

			}
			msg.channel.awaitMessages({ filter, max: 1, time: 30000, errors: ['time'] })
				.then(track => {
					console.log('i think this is on success?');
				})
				.catch(collected => {
					const embed = new Discord.MessageEmbed()
						.setColor(tofuOrange)
						.setDescription('Search was cancelled.');
					msg.channel.send({ embeds: [embed] });
				})
		});




		// Reference code, djs 12
		// const collectorString = `${message.author.id}-${message.channel.id}`;
		// const currentCollector = this._resultsCollectors.get(collectorString);
		// if (currentCollector) currentCollector.stop();

		// const collector = message.channel.createMessageCollector((m) => m.author.id === message.author.id, {
		// 	time: 60000
		// });

		// this._resultsCollectors.set(collectorString, collector);

		// this.emit(PlayerEvents.SEARCH_RESULTS, message, query, tracks, collector);

		// collector.on('collect', ({ content }) => {
		// 	if (content === 'cancel') {
		// 		collector.stop();
		// 		return this.emit(PlayerEvents.SEARCH_CANCEL, message, query, tracks);
		// 	}

		// 	if (!isNaN(content) && parseInt(content) >= 1 && parseInt(content) <= tracks.length) {
		// 		const index = parseInt(content, 10);
		// 		const track = tracks[index - 1];
		// 		collector.stop();
		// 		resolve(track);
		// 	} else {
		// 		this.emit(PlayerEvents.SEARCH_INVALID_RESPONSE, message, query, tracks, content, collector);
		// 	}
		// });

		// collector.on('end', (_, reason) => {
		// 	if (reason === 'time') {
		// 		this.emit(PlayerEvents.SEARCH_CANCEL, message, query, tracks);
		// 	}
		// });

	},
};



// Reference code, djs 12, searchinvalidresponse event
// let searchInvalidResponseEmbed = new Discord.MessageEmbed()
// .setColor(tofuOrange);

// if (content === 'cancel') {
// collector.stop();
// searchInvalidResponseEmbed.setDescription('Search was cancelled.');
// return message.channel.send({ embeds: [searchInvalidResponseEmbed] }).catch(e => { // TODO: test
// 	throw new Tantrum(client, 'searchInvalidResponse.js', 'Error on sending searchInvalidResponseEmbed (cancelled)', e);
// });
// } else {
// searchInvalidResponseEmbed.setDescription(`Please enter a valid number between **1** and **${tracks.length}**!`);
// message.channel.send({ embeds: [searchInvalidResponseEmbed] }).catch(e => { // TODO: test
// 	new Tantrum(client, 'searchInvalidResponse.js', 'Error on sending searchInvalidResponseEmbed (invalid number)', e);
// });
// }
