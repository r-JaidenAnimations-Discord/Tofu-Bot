const { generalChannelId } = require('../../config.json');
const { heyEnable, usrLeft } = require('../../functions/welcomeMsg.js');
const Discord = require('discord.js');

module.exports = async (client, member) => {
    usrLeft(client, member);
};