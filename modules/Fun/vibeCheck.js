// Grady's first command :3

module.exports = {
	name: 'vibecheck',
	helpTitle: 'Vibecheck',
	category: 'Fun',
	usage: 'vibecheck',
	description: 'U vibin?',
	isEnabled: true,
	isDeprecated: false,
	//aliases: [],
	cooldown: 3,
	execute: async function(client, message, args) {
        if (Math.floor (Math.random() *10 > 3 ))
            message.reply('is vibin!');
        else {
            message.reply('is not vibin!');
        }
	},
};