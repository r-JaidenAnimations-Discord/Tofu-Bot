module.exports = {
	name: 'reverse',
	helpTitle: 'Reverse',
    category: 'Text Manipulation',
    usage: 'reverse [text]',
	description: 'Reverse text.',
    isEnabled: true,
    isDeprecated: false,
	//aliases: [],
	cooldown: 5,
	execute: async function(client, message, args) {
        if (message.deletable) {
            message.delete();
        }
        if (args.length < 1) {
            return message.reply(';-; .oht yas ot tahW');
        }
        message.channel.send(args.join(' ').split('').reverse().join(''));
	},
};