const { maxID, movieNightChannelID } = require('../../config.json');

module.exports = {
	name: 'movienight',
	helpTitle: 'Movie Night',
	category: 'Movie Night',
	usage: 'movienight',
	description: 'Not sure, but it sounded fun',
	isEnabled: true,
	isDMAllowed: false,
	isDeprecated: false,
	aliases: ['mn'],
	cooldown: 2,
	execute: async function(client, message, args) {
		message.guild.channels.cache.find(c => c.id == args[0]) ||
		message.guild.channels.cache.find(c => c.name == args[0]);
		var isStarted = false;
		const voiceChannel = client.channels.cache.get(movieNightChannelID);
		//const dispatcher = connection;
	
		if (message.author.id !== maxID) return message.reply('Are you Maxim? I don\'t think so. Why are you trying to use my command. You should be ashamed of yourself. I hope you stub your toe on your chair. I hope you get aneurysm after aneurysm after aneurysm after aneurysm after aneurysm. Get one of those Dyson vacuums and see if it\'s strong enough to suck the stupid out of you. Don\'t EVER use this command again. Do you understand me? DO YOU UNDERSTAND ME?');
		
		if (message.deletable) message.delete();

		if (args[1] = 'join') {
			isStarted = true;
			voiceChannel.join().then(connection => {
				// Yay, it worked!
				console.log("Successfully connected.");
				const dispatcher = connection.play('https://raw.githubusercontent.com/Infonet-Team/Infonet-Team.github.io/master/Data/Sound/kettle/Engelwood%20-%20Crystal%20Dolphin.mp3');
			}).catch(e => {
				// Oh no, it errored! Let's log it to console :)
				console.error(e);
			});
		}
		else {
			voiceChannel.leave();
		}
	},
};