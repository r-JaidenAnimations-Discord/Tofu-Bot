const Discord = require('discord.js');
const { musicStrings } = require('#assets/global/strings.json');
const Tantrum = require('#tantrum');
const chalk = require('chalk');
const { tofuOrange, tofuError } = require('#colors');

class LavaManager {
	/**
	 * Creates a player
	 * @param {Client} client 
	 * @param {Message} message 
	 */
	static async createPlayer(client, message) {
		if (await this.getPlayer(client, message)) return this.lavaLog('A player already exists! createPlayer() called illegaly');
		this.lavaLog('Creating player...');
		return await client.music.createPlayer(message.guild.id)
			.connect(message.member.voice.channel)

			.on('channelMove', async function(oldChannel, newChannel) {
				const channel = message.guild.channels.cache.get(newChannel);
				const me = await message.guild.members.fetch(client.user.id);

				if (channel.type === 'GUILD_STAGE_VOICE' && me.voice.suppress) await message.guild.me.voice.setSuppressed(false).catch(e => {
					this.disconnect();
				});

				// await require('util').promisify(setTimeout)(1000);

				await this.pause();

				// await require('util').promisify(setTimeout)(1000);

				await this.resume();
			})

			.on('trackException', async function(str) {
				const track = await client.music.rest.decodeTrack(str).catch(e => {
					this.lavaLog('Decoding track failed');
				});

				// const channel = message.guild.channels.cache.get(messsage.channel.id);
				// channel.send(`**${track.title}** is not available`).catch(e => {
				// 	console.error(e); // will tantrum maybe. i'll see. i do plan on partially deprecating it
				// });
			})

			.on('channelLeave', async function(c, reason, remote) {
				await this.destroy();
			});
	}

	/**
	 * Check if the message author is in a voice channel (that is also the same one)
	 * @param {Client} client Discord client 
	 * @param {Message} message Message object
	 * @returns {Boolean} Author is (not) in (same) voice channel
	 */
	static vcChecks(client, message) {
		const musicCheckEmbed = new Discord.MessageEmbed();
		if (!message.member.voice.channel) {
			musicCheckEmbed.setColor(tofuOrange);
			musicCheckEmbed.setDescription(musicStrings.notInVoiceChannel);
			message.channel.send({ embeds: [musicCheckEmbed] }).catch(e => {
				throw new Tantrum(client, 'lavaManager.js', 'Error on sending musicCheckEmbed (notInVoiceChannel)', e);
			});
			return false;
		}

		if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) {
			musicCheckEmbed.setDescription(musicStrings.notSameVoiceChannel);
			message.channel.send({ embeds: [musicCheckEmbed] }).catch(e => {
				throw new Tantrum(client, 'lavaManager.js', 'Error on sending musicCheckEmbed (notSameVoiceChannel)', e);
			});
			return false;
		}
		return true;
	}

	/**
	 * Checks if the music is playing
	 * @param {Client} client Discord client
	 * @param {Message} message Message object
	 * @returns {Boolean} Playing state
	 */
	static async musicChecks(client, message) {
		if (!(await this.getPlayer(client, message)).playing) {
			const embed = new Discord.MessageEmbed()
				.setColor(tofuOrange)
				.setDescription(musicStrings.noMusicPlaying);
			message.channel.send({ embeds: [embed] }).catch(e => {
				throw new Tantrum(client, 'lavaManager.js', 'Error on sending embed (noMusicPlaying)', e);
			});
			return false;
		}
		return true;
	}

	/**
	 * Checks if the lavalink jar is connected
	 * @param {Client} client Discord client
	 * @param {Message} message Message object
	 * @returns {Boolean} State of the connection
	 */
	static async nodeChecks(client, message) {
		if (!client.music.conn || !client.music.conn.active) {
			const embed = new Discord.MessageEmbed()
				.setColor(tofuError)
				.setDescription('The music node got disconnected, no music can be fetched')
				.setTimestamp();
			message.channel.send({ embeds: [embed] });
			return false;
		}
		// todo fix
		return true;
	}

	/**
	 * Returns the player if it exists, null if it doesn't
	 * @param {Client} client Discord client
	 * @param {Message} message Message object 
	 * @returns {Player|null} Player if exists, otherwise null
	 */
	static async getPlayer(client, message) {
		const player = await client.music.players.get(message.guild.id);
		return player ?? null;
	}

	/**
	 * Checks if music is being played 
	 * @param {Client} client Discord client
	 * @param {Message} message Message object
	 * @returns {Boolean} Music playing state
	 */
	static async isPlaying(client, message) {
		const player = await this.getPlayer(client, message);
		return player.playing;
	}

	/**
	 * Logs a message with the [Lavalink]: prefix
	 * @param {*} message Message to log
	 */
	static lavaLog(message) {
		console.log(`${chalk.yellowBright('[Lavalink]')}:`, message);
	}
}

module.exports = LavaManager;
