const { tofuOrange } = require('#colors');
const Discord = require('discord.js');
const Tantrum = require('#tantrum');
const { musicStrings } = require('#assets/global/strings.json');

let musicCheckEmbed = new Discord.MessageEmbed();

/**
 * Check if the message author is in a voice channel (that is also the same one)
 * @param {Client} client Discord client 
 * @param {Object} message Message object
 * @returns {Boolean} Author is (not) in (same) voice channel
 */
const checkMusic = (client, message) => {
	if (!message.member.voice.channel) {
		musicCheckEmbed.setColor(tofuOrange);
		musicCheckEmbed.setDescription(musicStrings.notInVoiceChannel);
		message.channel.send({ embeds: [musicCheckEmbed] }).catch(e => {
			throw new Tantrum(client, 'musicCheck.js', 'Error on sending musicCheckEmbed (notInVoiceChannel)', e);
		});
		return false;
	}

	if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) {
		musicCheckEmbed.setDescription(musicStrings.notSameVoiceChannel);
		message.channel.send({ embeds: [musicCheckEmbed] }).catch(e => {
			throw new Tantrum(client, 'musicCheck.js', 'Error on sending musicCheckEmbed (notSameVoiceChannel)', e);
		});
		return false;
	}
	return true;
};

/**
 * Checks if music is being played 
 * @param {Client} client Discord client
 * @param {Object} message Message object
 * @returns {Boolean} Music playing state
 */
const checkQueueExists = (client, message) => {
	if (!client.player.getQueue(message.guild)) {
		musicCheckEmbed.setColor(tofuOrange);
		musicCheckEmbed.setDescription(musicStrings.noMusicPlaying);
		message.channel.send({ embeds: [musicCheckEmbed] }).catch(e => {
			throw new Tantrum(client, 'musicCheck.js', 'Error on sending musicCheckEmbed (noMusicPlaying)', e);
		});
		return false;
	}
	return true;
};

module.exports = {
	checkMusic,
	checkQueueExists
};
