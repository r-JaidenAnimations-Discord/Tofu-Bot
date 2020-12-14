const { infonetGreen } = require('../../config.json');
const Discord = require('discord.js');

module.exports = {
    name: 'say',
    helpTitle: 'Say',
    category: 'Fun',
    usage: 'say [#channel] (embed) [message]',
    description: 'Mess with members',
	isEnabled: false,
	//aliases: [],
    cooldown: 5,
	execute: async function(client, message, args) {
        let channel = message.mentions.channels.first() ||
        message.guild.channels.cache.find(c => c.id == args[0]) ||
        message.guild.channels.cache.find(c => c.name == args[0]);

        if (!channel) return message.channel.send('Couldn\'t find a channel with the arguments provided');
    
        if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.reply('You fool, need more permissions');

        if (message.deletable) message.delete();
        
        if (args[1] == 'embed') {
            const embed = new Discord.MessageEmbed()
                .setColor(infonetGreen)
                .setDescription(args.slice(2).join(' '));
            
            channel.send(embed);
        } else {
            channel.send(args.slice(1).join(' '));
        }
    },
};