const Tantrum = require('#tantrum');

module.exports = {
    name: 'fart',
    helpTitle: 'Fart',
    category: 'Fun',
    usage: 'fart',
    description: 'Because Grady be funni.',
    isDMAllowed: false,
    isDeprecated: false,
    isDangerous: false,
    isHidden: true,
    //aliases: [],
    cooldown: 5,
    execute: async function(client, message, args) {
        const { gradyID, retainedID, maxID } = client.config;

        ///if (!message.member.hasPermission('BAN_MEMBERS')) return;
        if (message.author.id !== gradyID && message.author.id !== retainedID && message.author.id !== maxID) return;

        try {
            message.channel.send('💨');
            // message.react('💨');
        } catch (e) {
            throw new Tantrum(client, 'fart,js', 'Error on sending fart', e);
        }
    },
};
