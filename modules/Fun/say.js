const { tofuGreen } = require('../../config.json');
const Discord = require('discord.js');

module.exports = {
    name: 'say',
    helpTitle: 'Say',
    category: 'Fun',
    usage: 'say [#channel] (embed) [message]',
    description: 'Mess with members',
    isEnabled: true,
    isDeprecated: false,
	//aliases: [],
    cooldown: 5,
	execute: async function(client, message, args) {
        let channel = message.mentions.channels.first() ||
        message.guild.channels.cache.find(c => c.id == args[0]) ||
        message.guild.channels.cache.find(c => c.name == args[0]);
    
        if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.reply('You fool, need more permissions');
        
        if (!channel) return message.channel.send('Where the actual F*CK do you want me to put that? My ass?');

        if (message.deletable) message.delete();
        
        if (args[1] == 'embed') {
            if (!args.slice(2).join(' ')) {
                return message.reply('All fine and good, but like. What to send. Can\'t you guys do this first try for once?')
            }

            const embed = new Discord.MessageEmbed()
                .setColor(tofuGreen)
                .setDescription(args.slice(2).join(' '));
            
            channel.send(embed);
        } else {
            if (!args.slice(1).join(' ')) {
                return message.reply('All fine and good, but like. What to send. Can\'t you guys do this first try for once?');
            }
            channel.send(args.slice(1).join(' '));
        }
    },
};