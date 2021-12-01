const Discord = require('discord.js');
const { musicStrings } = require('#assets/global/strings.json');
const chalk = require('chalk');
const { tofuOrange, tofuError } = require('#colors');

class LavaManager {
	/**
	 * Creates a player
	 * @param {Client} client Discord client
	 * @param {Message} message Message object
	 */
	static async createPlayer(client, message) {
		if (await this.getPlayer(client, message)) return this.lavaLog('A player already exists! createPlayer() called illegaly');
		this.lavaLog('Creating player...');
		const player = await client.music.createPlayer(message.guild.id);

		player.queue.channel = message.channel;
		await player.connect(message.member.voice.channel, { deafened: true });
		return player;
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
			message.channel.send({ embeds: [musicCheckEmbed] });
			return false;
		}

		if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) {
			musicCheckEmbed.setDescription(musicStrings.notSameVoiceChannel);
			message.channel.send({ embeds: [musicCheckEmbed] });
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
		if (!(await this.getPlayer(client, message))?.playing) {
			const embed = new Discord.MessageEmbed()
				.setColor(tofuOrange)
				.setDescription(musicStrings.noMusicPlaying);
			message.channel.send({ embeds: [embed] });
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
