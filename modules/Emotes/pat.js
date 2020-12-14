const Discord = require("discord.js");
const fs = require('fs');

module.exports = {
	name: 'pat',
	helpTitle: 'Pat',
    category: 'Emotes',
    usage: 'pat',
	description: 'Answer with the pat emote',
	isEnabled: true,
	aliases: ['jaidenpat'],
	cooldown: 5,
	execute: async function(client, message, args) {
		try {
			message.channel.send({files: ['./commanddata/JaidenPat.gif']})
			message.delete();
			
		} catch (e) {
			console.error(e);
			message.channel.send('Something went wrong, I\'m sorry');
		}
	},
};