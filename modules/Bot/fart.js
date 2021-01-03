const Discord = require('discord.js');

module.exports = {
    name: 'fart',
    helpTitle: 'Fart',
    category: 'Hidden',
    usage: 'fart',
    description: 'Because Grady be funni.',
    isEnabled: true,
    //aliases: [],
    cooldown: 0,
    execute: async function(client, message, args) {

      if (!message.member.hasPermission('BAN_MEMBERS')) return;
      message.channel.send('💨');
      message.react('💨');
    },
};