const Tantrum = require("../../functions/tantrum.js");

module.exports = {
    name: 'a',
    helpTitle: 'a',
    category: 'Bot',
    usage: 'a',
    description: 'Shrimp',
    isDMAllowed: false,
    isDeprecated: false,
    //aliases: [],
    cooldown: 0,
    execute: async function(client, message, args) {
        try {
            message.channel.send('a');
        } catch (e) {
            //return handleError(client, 'a.js', 'Error on sending a', e);
            throw new Tantrum(client, 'a.js', 'Error on sending a', e);
        }
    },
};
