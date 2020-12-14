module.exports = {
	name: 'reverse',
	helpTitle: 'Reverse',
    category: 'Text Manipulation',
    usage: 'reverse [text]',
	description: 'Reverse text',
	isEnabled: true,
	//aliases: [],
	cooldown: 5,
	execute: async function(client, message, args) {
        message.channel.bulkDelete(1, true).catch(err => {
			console.error(err);
			message.channel.send('Something went *very* wrong, I\'m sorry.');
			console.error('Basically, without saying too much, you\'re screwed. Royally');
		});
        if (args.length < 1) {
            return message.reply('You must input text to be reversed!');
        }
        message.channel.send(args.join(' ').split('').reverse().join(''));
	},
};