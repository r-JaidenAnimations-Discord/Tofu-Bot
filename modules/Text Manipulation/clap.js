module.exports = {
	name: 'clap',
	helpTitle: 'Clap',
    category: 'Text Manipulation',
    usage: 'clap [text]',
	description: 'Clap.',
	isEnabled: true,
	//aliases: [],
	cooldown: 5,
	execute: async function(client, message, args) {
        if (message.deletable) {
            message.delete();
        }
        if (args.length < 1) {
            return message.reply('You must input text to be reversed!');
        }
        console.log(args)
        //const clapped = args.split(' ').join(' 👏 ');
        const clapped = args.join(' 👏 ');
        const clappedEnd = `${clapped} 👏`;
        if (clappedEnd.length < 2000) {
            return message.channel.send(clappedEnd);
        }
        else {
            return message.reply('Invalid text, your text is too long.');
        }
	},
};