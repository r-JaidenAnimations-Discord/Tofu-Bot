const Discord = require("discord.js");

module.exports = {
	name: 'hype',
	helpTitle: 'Hype',
    category: 'Emotes',
    usage: 'hype',
    description: 'Answer with the hype emote',
	isEnabled: true,
	aliases: ['jaidenhype'],
	cooldown: 5,
	execute: async function(client, message, args) {
		try {
			message.channel.send({files: ['./commanddata/JaidenHype.gif']})
			message.delete();
			
		} catch (e) {
			console.error(e);
			message.channel.send('Something went wrong, I\'m sorry');
		}
	},
};