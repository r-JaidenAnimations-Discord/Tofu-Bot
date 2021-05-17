const { shrimpID } = require('../../config.json');
const Tantrum = require('../../functions/tantrum.js');

module.exports = {
    name: 'imnotshrimp',
    helpTitle: 'I\'m not Shrimp',
    category: 'Fun',
    usage: 'imnotshrimp',
    description: 'Not Shrimp',
    isDMAllowed: false,
    isDeprecated: false,
    aliases: ['notshrimp'],
    cooldown: 0,
    execute: async function(client, message, args) {
        if (message.author.id !== shrimpID) {
            try {
                return message.channel.send('You are not actually');
            } catch (e) {
                throw new Tantrum(client, 'imnotshrimp.js', 'Error on sending are you shrimp message', e);
            }
        }

        try {
            message.channel.send('But you are ;_;');
        } catch (e) {
            throw new Tantrum(client, 'imnotshrimp.js', 'Error on sending a', e);
        }
    },
};