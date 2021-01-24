const Discord = require('discord.js');
const { gradyID, retainedID, maxID } = require('../../config.json');

module.exports = {
    name: 'tfix',
    helpTitle: 'Fart',
    category: 'Hidden',
    usage: 'fart',
    description: 'Because Grady be funni.',
    isEnabled: true,
    isDeprecated: false,
    //aliases: [],
    cooldown: 0,
    execute: async function(client, message, args) {
        var memb = message.mentions.members.first();

            try {
                memb.roles.remove('755094113358970900') //mod
            }catch(e){}

            try {
                memb.roles.remove('756585204344291409') //staff
            }catch(e){}
            
            try {
                memb.roles.remove('775665978813054986') //helper
            }catch(e){}
            
    },
};