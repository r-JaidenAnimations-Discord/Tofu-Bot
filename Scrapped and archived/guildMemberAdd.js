const { botProfile ,infonetBlue, generalChannelId, botLogChannelId } = require('../../config.json');
const Discord = require('discord.js');

module.exports = async (client, member) => {
    const joinEmbed = new Discord.MessageEmbed()
        .setAuthor('Infonet Bot', botProfile)
        .setTitle('Member Joined')
        .setDescription(`${member} joined.`)
        .setColor(infonetBlue)
        .setFooter(`ID: ${member.id}`);
    client.channels.cache.get(generalChannelId).send(`Hi ${member}. Welcome to the Infonet Team discord server!`);
    client.channels.cache.get(botLogChannelId).send(joinEmbed);
};