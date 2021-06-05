// Grady's first command :3
const Tantrum = require('#tantrum');

module.exports = {
	name: 'vibecheck',
	helpTitle: 'Vibecheck',
	category: 'Fun',
	usage: 'vibecheck',
	description: 'U vibin?',
	isDMAllowed: false,
	isDeprecated: false,
	isDangerous: false,
	//aliases: [],
	cooldown: 3,
	execute: async function(client, message, args) {
		if (Math.floor(Math.random() * 10 > 3))
			try {
				message.reply('is vibin!');
			} catch (e) {
				throw new Tantrum(client, 'vibeCheck.js', 'Error on sending is vibin message', e);
			}
		else {
			try {
				message.reply('is not vibin!');
			} catch (e) {
				throw new Tantrum(client, 'vibeCheck.js', 'Error on sending is not vibin message', e);
			}
		}
	},
};
