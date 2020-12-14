const { botProfile, infonetBlue, generalChannelId, botLogChannelId } = require('../../config.json');
const Discord = require('discord.js');

module.exports = async (client, member) => {
    const leaveEmbed = new Discord.MessageEmbed()
        .setAuthor('Infonet Bot', botProfile)
        .setTitle('Member Left')
        .setDescription(`**${member.displayName}** left.`)
        .setColor(infonetBlue)
        .setFooter(`ID: ${member.id}`);
    client.channels.cache.get(generalChannelId).send(`Yeetus yeetus **${member.displayName}** deletus!`);
    client.channels.cache.get(botLogChannelId).send(leaveEmbed);
};