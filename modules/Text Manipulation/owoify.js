const owofy = require('owofy');

module.exports = {
	name: 'owoify',
	helpTitle: 'OwOify',
	category: 'Text Manipulation',
	usage: 'owoify [text]',
	description: 'OwO what\'s this',
	isDMAllowed: false,
	isDeprecated: false,
	isDangerous: false,
	mainServerOnly: false,
	isHidden: false,
	aliases: ['owofy'],
	cooldown: 5,
	execute: async function(client, message, args) {
		if (args.length < 1) return message.channel.send('What to say tho. ;-;');

		let input = args.join(' ');

		// Supress @everyone, @here and pinging roles
		[/@everyone/gi, /@here/gi, /<@&\d{18}>/].forEach(ping => {
			input = input.replace(ping, 'haha funny ping');
		});

		const owo = owofy(input);
		message.channel.send(owo);
	}
};
