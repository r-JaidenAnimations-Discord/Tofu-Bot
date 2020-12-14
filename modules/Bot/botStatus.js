const Discord = require('discord.js');
const { setSts } = require('../../functions/statusFunction.js');

module.exports = {
    name: 'status',
    helpTitle: 'Status',
    category: 'Bot',
    usage: 'status [{random, awake, asleep, busy, gone, stream, play, listen, next}]',
    description: 'Set the client\'s status',
    isEnabled: false,
    aliases: ['sts', 'stat'],
    cooldown: 1,
    execute: async function(client, message, args) {
      // yeah it just does this
      setSts(client, message, args[0]);  
    },
};