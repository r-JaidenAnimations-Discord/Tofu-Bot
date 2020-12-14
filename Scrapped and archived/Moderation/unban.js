const { Discord, MessageEmbed } = require('discord.js');
const { prefix, mxmProfile, infonetSvr, botProfile, infonetBlue, infonetGreen, infonetOrange, generalChannelId, botLogChannelId } = require('../../config.json');

module.exports = {
    name: 'unban',
    helpTitle: 'Unban',
    category: 'Moderation',
    usage: 'unban [ID]',
    description: 'Unban the mentioned user',
    guildOnly: true,
    isEnabled: false,
    aliases: ['unyeet'],
	cooldown: 5,
	execute: async function(client, message, args) {
        /*if (!message.mentions.users.size) {
            return message.reply('You need to mention a user in order to ban them!');
        }
        const taggedUser = message.mentions.users.first();
        message.channel.send(`You wanted to ban: ${taggedUser.username}`);*/



        if ( !message.member.hasPermission("BAN_MEMBERS") ) {
            return message.channel.send("Invalid Permissions")
        } 
        //let User = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]));
        ///if ( !User ) {
        ///    return message.channel.send("You need to mention a user in order to unban it.")
        ///}
        ////if( User.hasPermission('ADMINISTRATOR') || User.hasPermission('BAN_MEMBERS') || User.hasPermission('KICK_MEMBERS') ) {
        ////    return message.channel.send('Staff members can\'t be managed you fool');
        ////}
        //////if( User.user.bot ) {
        //    return message.channel.send('Bots can\'t be banned you fool');
        //}
       
        message.channel.bulkDelete(1, true).catch(err => {
			console.error(err);
			message.channel.send('Something went *very* wrong, I\'m sorry.');
			console.error('Basically, without saying too much, you\'re screwed. Royally');
		});
        //User.kick([banReason]);
        //User.ban({reason: banReason});
        //message.guild.members.unban(User)

        let userID = args[0]
        message.guild.fetchBans().then(bans=> {
        if(bans.size == 0) return message.channel.send("You need to mention a user ID in order to unban it.")
        let User = bans.find(b => b.user.id == userID)
        if(!User) return message.channel.send("Member not found")
        message.guild.members.unban(User.user)

        const unbanEmbed = new MessageEmbed()
            .setColor(infonetOrange)
            .setTitle('User unbanned')
            .setAuthor('Infonet Bot', botProfile)
            //.setDescription(`Automatic randomised messages have been set to: ${randomStatusEnable}`)
            .addField('Unbanned user', User.user)
            .addField('Unbanned by', message.author)
            .addField('In channel', message.channel)
            .addField('Timestamp', message.createdAt)
            .setTimestamp()
            //.setFooter('Made by Maxim Coppieters', mxmProfile);
        //client.channels.cache.get(generalChannelId).send(`${User} was banned from the server. Read the rules!`);
        client.channels.cache.get(botLogChannelId).send(unbanEmbed);


        })


	},
}





