const { botLogChannelId } = require('../../config.json');
const { Discord, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'prune',
    helpTitle: 'Prune',
    category: 'Moderation',
    usage: 'prune [number of messages]',
    description: 'Bulk delete n messages',
    guildOnly: true,
    isEnabled: true,
    aliases: ['purge', 'clear'],
	cooldown: 5,
	execute: async function(client, message, args) {
        const amount = parseInt(args[0]) + 1;
        if ( !message.member.hasPermission("MANAGE_MESSAGES") ) {
            return message.channel.send("Invalid Permissions")
        }
        if (isNaN(amount)) {
            return message.reply('That doesn\'t seem to be a valid number.');
        }
        else if (amount <= 1 || amount > 100) {
            return message.reply('You need to input a number between 1 and 99.');
        }
        message.channel.bulkDelete(amount, true).catch(err => {
            console.error(err);
            message.channel.send('There was an error trying to prune messages in this channel!');
        });
        
        //client.channels.cache.get(botLogChannelId).send(`${message.author} pruned ${args[0]} message(s) in ${message.channel}`);
        const pruneEmbed = new Discord.MessageEmbed()
            .setColor(infonetOrange)
            .setTitle('Messages Pruned')
            .setAuthor('Infonet Bot', botProfile)
            .setDescription(`${message.author} pruned ${args[0]} message(s) in ${message.channel}`)
            .setTimestamp()
            .setFooter('Made with love', mxmProfile);
        message.reply(`Banned ${User.displayName}`);
        client.channels.cache.get(botLogChannelId).send(pruneEmbed);
	},
};