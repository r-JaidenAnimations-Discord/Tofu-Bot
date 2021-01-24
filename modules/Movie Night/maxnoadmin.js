module.exports = {
	name: 'maxnoadmin',
	helpTitle: 'Max No Admin',
    category: 'Movie Night',
    usage: 'maxnoadnin [#channel] [message]',
    description: 'Because Max doesn\'t have perms to ping movie night AAAAAAAAAAAA',
    isEnabled: true,
    isDeprecated: false,
	//aliases: [],
	cooldown: 5,
	execute: async function(client, message, args) {
        let channel = message.mentions.channels.first() ||
        message.guild.channels.cache.find(c => c.id == args[0]) ||
        message.guild.channels.cache.find(c => c.name == args[0]);
    
        if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.reply('Are you Maxim? I don\'t think so. Why are you trying to use my command. You should be ashamed of yourself. I hope you stub your toe on your chair. I hope you get aneurysm after aneurysm after aneurysm after aneurysm after aneurysm. Get one of those Dyson vacuums and see if it\'s strong enough to suck the stupid out of you. Don\'t EVER use this command again. Do you understand me? DO YOU UNDERSTAND ME?');
        
        if (!channel) return message.channel.send('Couldn\'t find a channel with the arguments provided');

        if (message.deletable) message.delete();
        
        if (args[1] == 'embed') {
            const embed = new Discord.MessageEmbed()
                .setColor(tofuGreen)
                .setDescription(args.slice(2).join(' '));
            
            channel.send(embed);
        } else {
            channel.send(args.slice(0).join(' '));
        }
	},
};