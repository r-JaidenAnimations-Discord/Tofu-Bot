const Discord = require('discord.js');
const { botProfile, infonetBlue, infonetGreen, infonetOrange } = require('../../config.json');

module.exports = {
    name: 'user-info',
    helpTitle: 'User info',
    category: 'User Tools',
    usage: 'user-info [ID]',
    description: 'Retrieve info from a mentioned user',
    guildOnly: false,
    isEnabled: false, // completely and utterly broken
	aliases: ['user'],
    cooldown: 5,
	execute: async function(client, message, args) {
        let targetMember;
        if(args.length === 0) {
            targetMember = message.member;
        } else {
            targetMember = message.mentions.members.first() || message.guild.members.get(args[0])
        }
        if(!targetMember) targetMember = message.member

        let userEmbed = new Discord.MessageEmbed()
            .setAuthor(targetMember.user.username + '#' + targetMember.user.discriminator, targetMember.user.displayAvatarURL)
            .addField('ID', targetMember.id)
            .addField('Nickname', `${targetMember.nickname !== null ? `${targetMember.nickname}` : 'None'}`, true)
            .addField('Status', `${targetMember.user.presence.status}`, true)
            .addField('Bot', `${targetMember.user.bot}`, true)
            .addField('Joined At', `${targetMember.user.createdAt}`,)
            .addField('Created At', `${targetMember.joinedAt}`,)
            .setThumbnail(`${targetMember.user.avatarURL}`)
            .setColor(infonetOrange)
        message.channel.send(userEmbed);
	},
};