const Discord = require('discord.js');
const { toggleHeyEnable } = require('../../functions/welcomeMsg.js');

module.exports = {
    name: 'announce',
    helpTitle: 'Announce',
    category: 'Bot',
    usage: 'announce ({enable, disable})',
    description: 'Enable or Disable the welcome/bye message.',
    isEnabled: true,
    //aliases: [],
    cooldown: 0,
    execute: async function(client, message, args) {

      if (!message.member.hasPermission('BAN_MEMBERS')) return message.reply('You fool, need more permissions');

      // yeah it just does this
      toggleHeyEnable(client, message, args);
    },
};