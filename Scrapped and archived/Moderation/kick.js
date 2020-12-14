const { Discord, MessageEmbed } = require('discord.js');
const { mxmProfile, botProfile, infonetOrange, botLogChannelId } = require('../../config.json');

module.exports = {
    name: 'kick',
    helpTitle: 'Kick',
    category: 'Moderation',
    usage: 'kick [{@user, ID}] [reason]',
    description: 'Kick the mentioned user',
    guildOnly: true,
    isEnabled: true,
    aliases: ['yeet'],
	cooldown: 5,
	execute: async function(client, message, args) {
        /*if (!message.mentions.users.size) {
            return message.reply('You need to mention a user in order to kick them!');
        }
        const taggedUser = message.mentions.users.first();
        message.channel.send(`You wanted to kick: ${taggedUser.username}`);*/


        if ( !message.member.hasPermission("KICK_MEMBERS") ) {
            return message.channel.send("Invalid Permissions")
        } 
        let User = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]));
        if ( !User ) {
            return message.channel.send("You need to mention a user in order to kick it.")
        }
        if( User.hasPermission('ADMINISTRATOR') || User.hasPermission('BAN_MEMBERS') || User.hasPermission('KICK_MEMBERS') ) {
            return message.channel.send('Staff members can\'t be kicked you fool');
        }
        if( User.user.bot ) {
            return message.channel.send('Bots can\'t be kicked you fool');
        }
        let kickReason = args.join(" ").slice(22);
        if ( !kickReason ) {
            return message.channel.send("A reason is required")
        }
        message.channel.bulkDelete(1, true).catch(err => {
			console.error(err);
			message.channel.send('Something went *very* wrong, I\'m sorry.');
			console.error('Basically, without saying too much, you\'re screwed. Royally');
        });
        
        User.kick([kickReason]);

        const kickEmbed = new MessageEmbed()
            .setColor(infonetOrange)
            .setTitle('User kicked')
            .setAuthor('Infonet bot', botProfile)
            //.setDescription(`Automatic randomised messages have been set to: ${randomStatusEnable}`)
            .addField('Kicked user', User)
            .addField('Kicked by', message.author)
            .addField('In channel', message.channel)
            .addField('Reason', kickReason)
            .addField('Timestamp', message.createdAt)
            .setTimestamp()
            .setFooter('Made with love', mxmProfile);
        message.reply(`Kicked ${User.displayName}`);
        client.channels.cache.get(botLogChannelId).send(kickEmbed);
	},
};