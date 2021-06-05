//const { tofuError } = require('../../config.json');
const { tofuError } = require('#colors');
const Discord = require('discord.js');
const Tantrum = require('#tantrum');
const { musicStrings } = require('#commandData/strings.json');

module.exports = (client, error, message, ...args) => {
	// const { tofuError } = client.config;

	let errorEmbed = new Discord.MessageEmbed()
		.setColor(tofuError)
		.setTimestamp();

	switch (error) {
		case 'NotPlaying':
			errorEmbed.setDescription(musicStrings.noMusicPlaying);
			try {
				message.channel.send(errorEmbed);
			} catch (e) {
				new Tantrum(client, 'error.js', 'Error on sending errorEmbed (noMusicPlaying)', e);
			}
			break;
		case 'NotConnected':
			errorEmbed.setDescription(musicStrings.notInVoiceChannel);
			try {
				message.channel.send(errorEmbed);
			} catch (e) {
				new Tantrum(client, 'error.js', 'Error on sending errorEmbed (notInVoiceChannel)', e);
			}
			break;
		case 'UnableToJoin':
			errorEmbed.setDescription(musicStrings.unableToJoin);
			try {
				message.channel.send(errorEmbed);
			} catch (e) {
				new Tantrum(client, 'error.js', 'Error on sending errorEmbed (unableToJoin)', e);
			}
			break;
		case 'VideoUnavailable':
			errorEmbed.setDescription(`${args[0].title} is not available and will be skipped.`);
			try {
				message.channel.send(errorEmbed);
			} catch (e) {
				new Tantrum(client, 'error.js', 'Error on sending errorEmbed (item unavailable)', e);
			}
			break;
		case 'MusicStarting':
			errorEmbed.setDescription('The music is starting... please wait a bit!');
			try {
				message.channel.send(errorEmbed);
			} catch (e) {
				new Tantrum(client, 'error.js', 'Error on sending errorEmbed (stillStarting)', e);
			}
			break;
		default:
			errorEmbed.setDescription(`Tofu choked...\nError:\`${error}\``);
			try {
				message.channel.send(errorEmbed);
			} catch (e) {
				new Tantrum(client, 'error.js', 'Error on sending errorEmbed (choke)', e);
			}
			new Tantrum(client, 'error.js', 'Tofu choked', error);
	};
};
