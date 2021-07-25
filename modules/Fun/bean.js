const Tantrum = require('#tantrum');

module.exports = {
	name: 'bean',
	helpTitle: 'Bean',
	category: 'Fun',
	usage: 'bean ({@user, something else})',
	description: 'Hmmmmm. Beans',
	isDeprecated: false,
	isDangerous: false,
	isHidden: false,
	//aliases: [],
	cooldown: 5,
	execute: async function(client, message, args) {
		if (!args[0] || message.mentions.users.first() === message.author) {
			return message.channel.send('You got some beans and ate them with your rice, ah yes...').catch(e => {
				throw new Tantrum(client, 'bean.js', 'Error on sending \'got some beans and ate em\'', e);
			});
		}
		else if (message.mentions.users.first()) {
			if (message.deletable) message.delete();
			return message.channel.send(`${message.mentions.users.first()} was beaned!`).catch(e => {
				throw new Tantrum(client, 'bean.js', 'Error on sending firstping was beaned', e);
			});
		}
		else if (message.guild.members.cache.get(args[0])) {
			if (message.deletable) message.delete();
			return message.channel.send(`<@!${args[0]}> was beaned!`).catch(e => {
				throw new Tantrum(client, 'bean.js', 'args[0] was beaned', e);
			});
		}
		else {
			if (message.deletable) message.delete();
			// Supress @everyone, @here and pinging roles
			let input = args.join(' ');
			[/@everyone/gi, /@here/gi, /<@&\d{18}>/].forEach(ping => {
				input = input.replace(ping, 'haha funny ping');
			});
			return message.channel.send(`${input} was beaned!`).catch(e => {
				throw new Tantrum(client, 'bean.js', 'Error on sending args.join was beaned', e);
			});
		}
	},
};
