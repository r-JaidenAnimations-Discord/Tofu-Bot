const Discord = require('discord.js');
const { toggleKiritoTrust } = require('../../functions/kiritoTrust.js');
const { maxID } = require('../../config.json');

module.exports = {
    name: 'kirito',
    helpTitle: 'Trust kirito',
    category: 'Hidden',
    usage: 'kirito ({enable, disable})',
    description: 'Enable or Disable the kirito trust.',
    isEnabled: true,
    //aliases: [],
    cooldown: 0,
    execute: async function(client, message, args) {

        if (!message.author.id == maxID) return;

      // yeah it just does this
      toggleKiritoTrust(client, message, args);
      
      message.delete();
      //message.react('✅');
    },
};