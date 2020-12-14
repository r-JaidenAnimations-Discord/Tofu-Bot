const randomStatusFct = require('../../functions/randomStatus.js')

module.exports = {
	name: 'randomstatus',
    description: 'Toggle the random status',
    guildOnly: false,
    isEnabled: true,
    aliases: ['rs'],
	cooldown: 5,
	execute: async function(client, message, args) {
        randomStatusFct.toggleRandomStatus(client, message, args);
	}
};