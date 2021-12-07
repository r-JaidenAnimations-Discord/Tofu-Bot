module.exports = {
	name: 'clap',
	helpTitle: 'Clap',
    category: 'Text Manipulation',
    usage: 'clap [text]',
	description: 'Clap ',
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
        console.log(args)
        //const clapped = args.split(' ').join(' 👏 ');
        let clapped = args.join(' 👏 ');

        // Supress @everyone, @here and pinging roles
        [/@everyone/gi, /@here/gi, /<@&\d{18}>/].forEach(ping => {
            clapped = clapped.replace(ping, 'haha funny ping');
        });

        const clappedEnd = `${clapped} 👏`;
        if (clappedEnd.length < 2000) {
            return message.channel.send(clappedEnd);
        }
        else {
            return message.reply('Invalid text, your text is too long.');
        }
	},
};