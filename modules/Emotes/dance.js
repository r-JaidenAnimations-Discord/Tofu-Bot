module.exports = {
	name: 'dance',
	helpTitle: 'Dance',
    category: 'Emotes',
    usage: 'dance',
	description: 'Answer with the dance emote',
	isEnabled: true,
	aliases: ['jaidendance'],
	cooldown: 5,
	execute: async function(client, message, args) {
        message.channel.bulkDelete(1, true).catch(err => {
			console.error(err);
			message.channel.send('Something went *very* wrong, I\'m sorry.');
			console.error('Basically, without saying too much, you\'re screwed. Royally');
		});
		message.channel.send('', { files: ["./modules/emotes/Jaiden_dance.gif"] });
	},
};