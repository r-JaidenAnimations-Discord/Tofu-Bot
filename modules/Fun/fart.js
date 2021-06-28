const { gradyID, retainedID, maxID } = require('#memberIDs');
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

        if (message.author.id !== gradyID && message.author.id !== maxID) return;

        await message.react('💨').catch(e => {
            throw new Tantrum(client, 'fart,js', 'Error on sending fart', e);
        });
    },
};
