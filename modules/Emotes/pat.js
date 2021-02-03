module.exports = {
	name: 'pat',
	helpTitle: 'Pat',
	category: 'Emotes',
	usage: 'pat',
	description: 'Answer with the pat emote',
	isEnabled: true,
	isDeprecated: true,
	aliases: ['jaidenpat'],
	cooldown: 5,
	execute: async function(client, message, args) {
		try {
			message.channel.send({files: ['./commanddata/JaidenPat.gif']});
			if (message.deletable) message.delete();
		} catch (e) {
			console.error(e);
			message.channel.send('Something went wrong, I\'m sorry');
		}
	},
};