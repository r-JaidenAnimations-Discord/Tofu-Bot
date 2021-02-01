module.exports = {
	name: 'dance',
	helpTitle: 'Dance',
    category: 'Emotes',
    usage: 'dance',
	description: 'Answer with the dance emote',
	isEnabled: true,
	isDeprecated: true,
	aliases: ['jaidendance'],
	cooldown: 5,
	execute: async function(client, message, args) {
        try {
			message.channel.send({files: ['./commanddata/JaidenDance.gif']});
			if (message.deletable) message.delete();
		} catch (e) {
			console.error(e);
			message.channel.send('Something went wrong, I\'m sorry');
		}
	},
};