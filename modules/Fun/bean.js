module.exports = {
    name: 'bean',
    helpTitle: 'Bean',
    category: 'Fun',
    usage: 'bean ({@user, something else})',
    description: 'Hmmmmm. Beans',
	isEnabled: true,
	//aliases: [],
    cooldown: 5,
	execute: async function(client, message, args) {
        if(!args[0] || message.mentions.users.first() === message.author) {
            return message.channel.send('You got some beans and ate them with your rice, ah yes...');

        } else if (message.mentions.users.first()) {
            if (message.deletable) message.delete();
            return message.channel.send(`${message.mentions.users.first()} was beaned!`);

        } else if (message.guild.members.cache.get(args[0])) {
            if (message.deletable) message.delete();
            return message.channel.send(`<@!${args[0]}> was beaned!`);

        } else {
            if (message.deletable) message.delete();
            return message.channel.send(`${args.join(' ')} was beaned!`);
        }
    },
};