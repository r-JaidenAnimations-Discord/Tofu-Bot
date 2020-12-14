const { botProfile, infonetOrange, botLogChannelId } = require('../../config.json');
const Discord = require('discord.js');

module.exports = async (client, member) => {
    const unbanEmbed = new Discord.MessageEmbed()
        .setAuthor('Infonet Bot', botProfile)
        .setTitle('Unbanned')
        .setDescription(`<@${member.id}> was unbanned.`)
        .setColor(infonetOrange)
        .setFooter(`ID: ${member.id}`);
    client.channels.cache.get(botLogChannelId).send(unbanEmbed);
};