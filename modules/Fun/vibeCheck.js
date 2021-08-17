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
	isHidden: false,
	//aliases: [],
	cooldown: 3,
	execute: async function(client, message, args) {
		if (Math.floor(Math.random() * 10 > 3))
			message.reply(`${message.author.username} is vibin!`).catch(e => {
				throw new Tantrum(client, 'vibeCheck.js', 'Error on sending is vibin message', e);
			});
		else {
			message.reply(`${message.author.username} is not vibin!`).catch(e => {
				throw new Tantrum(client, 'vibeCheck.js', 'Error on sending is not vibin message', e);
			});
		}
	},
};
