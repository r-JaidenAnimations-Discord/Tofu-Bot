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
        message.channel.bulkDelete(1, true).catch(err => {
			console.error(err);
			message.channel.send('Something went *very* wrong, I\'m sorry.');
			console.error('Basically, without saying too much, you\'re screwed. Royally');
		});
		message.channel.send('', { files: ["./modules/emotes/JaidenPat.gif"] });
	},
};