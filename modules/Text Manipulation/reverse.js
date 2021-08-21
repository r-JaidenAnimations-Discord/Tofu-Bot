module.exports = {
	name: 'reverse',
	helpTitle: 'Reverse',
	category: 'Text Manipulation',
	usage: 'reverse [text]',
	description: 'Reverse text.',
	isDMAllowed: false,
	isDeprecated: false,
	isDangerous: false,
	mainServerOnly: false,
	isHidden: false,
	isHidden: false,
	// aliases: [],
	cooldown: 5,
	execute: async function(client, message, args) {
		let input = args.join(' ');

		// Supress @everyone, @here and pinging roles
		[/@everyone/gi, /@here/gi, /<@&\d{18}>/].forEach(ping => {
			input = input.replace(ping, 'haha funny ping');
		});

		if (args.length < 1) return message.reply(';-; .oht yas ot tahW');

		message.channel.send(input.split('').reverse().join(''));
	},
};
