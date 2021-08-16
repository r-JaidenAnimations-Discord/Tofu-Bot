module.exports = {
	name: 'seek',
	helpTitle: 'Seek',
	category: 'Music',
	usage: 'not yet',
	description: 'Coming soon: seek trough the current track!',
	isDMAllowed: false,
	isDeprecated: false,
	isDangerous: false,
	isHidden: true,
	// aliases: [],
	cooldown: 0,
	execute: async function(client, message, args) {
		return client.commands.get('help').execute(client, message, ['seek']);
	},
};
