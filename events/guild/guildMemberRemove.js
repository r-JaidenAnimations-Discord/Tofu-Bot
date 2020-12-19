const { generalChannelId } = require('../../config.json');
const { heyEnable, usrLeft } = require('../../functions/welcomeMsg.js');
const Discord = require('discord.js');

module.exports = async (client, member) => {
    //console.log(heyEnable)
    //if (heyEnable === false) return
    //client.channels.cache.get(generalChannelId).send(`Welps, guess like **${member.displayName}** couldn't stand to be around us, adiós.`);
    //
    usrLeft(client, member);
};