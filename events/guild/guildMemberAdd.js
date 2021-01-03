const { generalChannelId } = require('../../config.json');
const { heyEnable, usrJoin } = require('../../functions/welcomeMsg.js');
const Discord = require('discord.js');

module.exports = async (client, member) => {
    usrJoin(client, member);
};