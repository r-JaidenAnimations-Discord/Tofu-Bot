const { generalChannelId } = require('../../config.json');
const { heyEnable, usrJoin } = require('../../functions/welcomeMsg.js');
const Discord = require('discord.js');

module.exports = async (client, member) => {
    //console.log(heyEnable)
    //if (heyEnable === false) return
    //client.channels.cache.get(generalChannelId).send(`Hello, <@${member.id}>. Welcome to r/JaidenAnimations!`);
    usrJoin(client, member);
};