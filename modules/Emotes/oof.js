const { OOF1, OOF2, OOF3, OOF4 } = require('../../commanddata/emoji.json');

module.exports = {
	name: 'oof',
	helpTitle: 'Jaiden oof',
    category: 'Emotes',
    usage: 'oof',
    description: 'Answer with the oof emote',
	isEnabled: true,
	isDeprecated: true,
    aliases: ['jaidenoof', 'off', 'jaidenoff'],
	cooldown: 5,
	execute: async function(client, message, args) {
		try {
			message.channel.send(`<:OOF1:${OOF1}><:OOF1:${OOF2}>\n<:OOF1:${OOF3}><:OOF1:${OOF4}>`);
			//if (message.deletable) message.delete();
		} catch (e) {
			console.error(e);
			message.channel.send('Something went wrong, I\'m sorry');
		}
	},
};