const { Discord, MessageEmbed } = require('discord.js');
const { mxmProfile, botProfile, infonetOrange, botLogChannelId } = require('../../config.json');

module.exports = {
    name: 'ban',
    helpTitle: 'Ban',
    category: 'Moderation',
    usage: 'ban [{@user, ID}] [reason]',
    description: 'Ban the mentioned user',
    guildOnly: true,
    isEnabled: true,
    aliases: ['permayeet'],
	cooldown: 5,
	execute: async function(client, message, args) {
        /*if (!message.mentions.users.size) {
            return message.reply('You need to mention a user in order to ban them!');
        }
        const taggedUser = message.mentions.users.first();
        message.channel.send(`You wanted to ban: ${taggedUser.username}`);*/



        if (!message.member.hasPermission("BAN_MEMBERS")) {
            return message.channel.send("Invalid Permissions")
        } 
        let User = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]));
        if (!User) {
            return message.channel.send("You need to mention a user in order to ban it.")
        }
        if(User.hasPermission('ADMINISTRATOR') || User.hasPermission('BAN_MEMBERS') || User.hasPermission('BAN_MEMBERS')) {
            return message.channel.send('Staff members can\'t be banned you fool');
        }
        if(User.user.bot) {
            return message.channel.send('Bots can\'t be banned you fool');
        }
        let banReason = args.join(" ").slice(22);
        if (!banReason) {
            return message.channel.send("A reason is required")
        }
        message.channel.bulkDelete(1, true).catch(err => {
			console.error(err);
			message.channel.send('Something went *very* wrong, I\'m sorry.');
			console.error('Basically, without saying too much, you\'re screwed. Royally');
        });
        
        User.ban({reason: banReason});

        const banEmbed = new MessageEmbed()
            .setColor(infonetOrange)
            .setTitle('User banned')
            .setAuthor('Infonet Bot', botProfile)
            .addField('Banned user', User)
            .addField('Banned by', message.author)
            .addField('In channel', message.channel)
            .addField('Reason', banReason)
            .addField('Timestamp', message.createdAt)
            .setTimestamp()
            .setFooter('Made with love', mxmProfile);
        message.reply(`Banned ${User.displayName}`);
        client.channels.cache.get(botLogChannelId).send(banEmbed);
	},
};