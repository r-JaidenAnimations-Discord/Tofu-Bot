module.exports = {
	name: 'seek',
	helpTitle: 'Seek',
	category: 'Music',
	usage: 'not yet',
	description: 'Coming soon: seek trough the current track!',
	isDeprecated: false,
	isDangerous: false,
	isHidden: false,
	// aliases: [],
	cooldown: 0,
	execute: async function(client, message, args) {
		return client.commands.get('help').execute(client, message, ['seek']);
	},
};
