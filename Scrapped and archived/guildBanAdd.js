const { botProfile, infonetOrange, generalChannelId, botLogChannelId } = require('../../config.json');
const Discord = require('discord.js');

module.exports = async (client, member) => {
    //client.channels.cache.get(generalChannelId).send(`<@${member.id}> was banned`);
    const banEmbed = new Discord.MessageEmbed()
        .setAuthor('Infonet Bot', botProfile)
        .setTitle('Banned')
        .setDescription(`**${member}** was banned, read the rules.`)
        .setColor(infonetOrange)
        .setFooter(`ID: ${member.id}`);
    client.channels.cache.get(generalChannelId).send(banEmbed);
    client.channels.cache.get(botLogChannelId).send(banEmbed);
};