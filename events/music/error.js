const { tofuError } = require('#colors');
const Discord = require('discord.js');
const Tantrum = require('#tantrum');
const { musicStrings } = require('#commandData/strings.json');

module.exports = (client, error, message, ...args) => {

	let errorEmbed = new Discord.MessageEmbed()
		.setColor(tofuError)
		.setFooter('This error has been automatically reported to the devs')
		.setTimestamp();

	switch (error) {
		case 'NotPlaying':
			errorEmbed.setDescription(musicStrings.noMusicPlaying);
			message.channel.send(errorEmbed).catch(e => { // TODO: Embedify and test
				new Tantrum(client, 'error.js', 'Error on sending errorEmbed (noMusicPlaying)', e);
			});
			break;
		case 'NotConnected':
			errorEmbed.setDescription(musicStrings.notInVoiceChannel);
			message.channel.send(errorEmbed).catch(e => { // TODO: Embedify and test
				new Tantrum(client, 'error.js', 'Error on sending errorEmbed (notInVoiceChannel)', e);
			});
			break;
		case 'UnableToJoin':
			errorEmbed.setDescription(musicStrings.unableToJoin);
			message.channel.send(errorEmbed).catch(e => { // TODO: Embedify and test
				new Tantrum(client, 'error.js', 'Error on sending errorEmbed (unableToJoin)', e);
			});
			break;
		case 'VideoUnavailable':
			errorEmbed.setDescription(`${args[0].title} is not available and will be skipped.`);
			message.channel.send(errorEmbed).catch(e => { // TODO: Embedify and test
				new Tantrum(client, 'error.js', 'Error on sending errorEmbed (item unavailable)', e);
			});
			break;
		case 'MusicStarting':
			errorEmbed.setDescription('The music is starting... please wait a bit!');
			message.channel.send(errorEmbed).catch(e => { // TODO: Embedify and test
				new Tantrum(client, 'error.js', 'Error on sending errorEmbed (stillStarting)', e);
			});
			break;
		default:
			errorEmbed.setDescription(`Tofu choked...\nError:\`${error}\``);
			message.channel.send(errorEmbed).catch(e => { // TODO: Embedify and test
				new Tantrum(client, 'error.js', 'Error on sending errorEmbed (choke)', e);
			});
			new Tantrum(client, 'error.js', 'Tofu choked', error);
	}
};
