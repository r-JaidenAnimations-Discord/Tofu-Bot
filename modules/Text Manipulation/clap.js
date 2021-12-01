module.exports = {
	name: 'clap',
	helpTitle: 'Clap',
	category: 'Text Manipulation',
	usage: 'clap [text]',
	description: 'Why 👏 did 👏 I 👏 make 👏 this? 👏',
	isDMAllowed: false,
	isDangerous: false,
	mainServerOnly: false,
	isHidden: false,
	// aliases: [],
	cooldown: 5,
	execute: async function(client, message, args) {
		if (args.length < 1) return message.reply('What 👏 to 👏 say 👏 tho. 👏 ;-;');

		let input = args.join(' 👏 ');

		// Supress @everyone, @here and pinging roles
		[/@everyone/gi, /@here/gi, /<@&\d{18}>/].forEach(ping => {
			input = input.replace(ping, 'haha funny ping');
		});

		const clappedEnd = `${input} 👏`;
		return clappedEnd.length < 2000 ? message.channel.send(clappedEnd) : message.reply('Hey, can you chill? Keep the length of the message a bit shorter.');
	},
};
