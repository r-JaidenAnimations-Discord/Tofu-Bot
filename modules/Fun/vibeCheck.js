// Grady's first command :3
module.exports = {
	name: 'vibecheck',
	helpTitle: 'Vibecheck',
	category: 'Fun',
	usage: 'vibecheck',
	description: 'U vibin?',
	isDMAllowed: false,
	isDangerous: false,
	mainServerOnly: false,
	isHidden: false,
	// aliases: [],
	cooldown: 3,
	execute: async function(client, message, args) {
		if (Math.floor(Math.random() * 10 > 3))
			message.reply(`${message.author.username} is vibin!`);
		else {
			message.reply(`${message.author.username} is not vibin!`);
		}
	},
};
