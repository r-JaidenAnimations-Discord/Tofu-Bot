const { maxID } = require('#memberIDs');

module.exports = {
	name: 'maxnoadmin',
	helpTitle: 'Max No Admin',
	category: 'Movie Night',
	usage: 'maxnoadnin (invite) [#channel] [message]',
	description: 'Because Max doesn\'t have perms to ping movie night AAAAAAAAAAAA',
	isDMAllowed: false,
	isDangerous: true,
	mainServerOnly: false,
	isHidden: false,
	// aliases: [],
	cooldown: 5,
	execute: async function(client, message, args) {
		const { movieNightRoleID, jaidenServerID, movieNightChannelID } = client.config;

		const channel = message.mentions.channels.first() ||
			message.guild.channels.cache.find(c => c.id === args[0]) ||
			message.guild.channels.cache.find(c => c.name === args[0]);

		if (message.author.id !== maxID) return message.reply('Are you Maxim? I don\'t think so. Why are you trying to use my command. You should be ashamed of yourself. I hope you stub your toe on your chair. I hope you get aneurysm after aneurysm after aneurysm after aneurysm after aneurysm. I hope your teeth itch. Get one of those Dyson vacuums and see if it\'s strong enough to suck the stupid out of you. Don\'t EVER use this command again. Do you understand me? DO YOU UNDERSTAND ME?');

		if (!channel) return message.channel.send('Where the actual F*CK do you want me to place that?');

		if (args[1] === 'invite') {
			const movieNightChannelInvite = await client.guilds.cache.get(jaidenServerID).channels.cache.get(movieNightChannelID).createInvite(
				{
					maxAge: 3600, // maximum time for the invite, in seconds
					maxUses: 0 // maximum times it can be used, 0 for infinite
				},
				'Movie Night invite'
			);

			if (!args.slice(2).join(' ')) return message.reply('All fine and good, but like. What to send. Can\'t you guys do this first try for once?');

			channel.send(`<@&${movieNightRoleID}>\n${args.slice(2).join(' ')}\n${movieNightChannelInvite}\n*This automatic invite is valid for 1 hour, check the voice channels if you are joining later*`);
			await message.react('✅');
		}
		else {
			if (!args.slice(1).join(' ')) return message.reply('All fine and good, but like. What to send. Can\'t you guys do this first try for once?');

			channel.send(`<@&${movieNightRoleID}>\n${args.slice(1).join(' ')}`);
			await message.react('✅');
		}
	},
};
