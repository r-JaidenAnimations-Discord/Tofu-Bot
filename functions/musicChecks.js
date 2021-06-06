//const { tofuOrange } = require('../config.json');
const { tofuOrange } = require('#colors');
const Discord = require('discord.js');
const Tantrum = require('#tantrum');
const { musicStrings } = require('#commandData/strings.json');

let musicCheckEmbed = new Discord.MessageEmbed();

const checkMusic = (client, message) => {
	// const { tofuOrange } = client.config;

	if (!message.member.voice.channel) {
		musicCheckEmbed.setColor(tofuOrange);
		musicCheckEmbed.setDescription(musicStrings.notInVoiceChannel);
		try {
			message.channel.send(musicCheckEmbed);
		} catch (e) {
			throw new Tantrum(client, 'musicCheck.js', 'Error on sending musicCheckEmbed (notInVoiceChannel)', e);
		}
		return false;
	}

	if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) {
		musicCheckEmbed.setDescription(musicStrings.notSameVoiceChannel);
		try {
			message.channel.send(musicCheckEmbed);
		} catch (e) {
			throw new Tantrum(client, 'musicCheck.js', 'Error on sending musicCheckEmbed (notSameVoiceChannel)', e);
		}
		return false;
	}
	return true;
}

const checkQueueExists = (client, message) => {
	// const { tofuOrange } = client.config;

	if (!client.player.getQueue(message)) {
		musicCheckEmbed.setColor(tofuOrange);
		musicCheckEmbed.setDescription(musicStrings.noMusicPlaying);
		try {
			message.channel.send(musicCheckEmbed);
		} catch (e) {
			throw new Tantrum(client, 'musicCheck.js', 'Error on sending musicCheckEmbed (noMusicPlaying)', e);
		}
		return false;
	}
	return true;
}

module.exports = {
	checkMusic,
	checkQueueExists
};
