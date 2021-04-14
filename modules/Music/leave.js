const Tantrum = require('../../functions/tantrum.js');
const { canModifyQueue } = require('../../functions/music.js');
const { musicStrings } = require('../../commanddata/strings.json');

module.exports = {
    name: 'leave',
    helpTitle: 'Leave',
    category: 'Music',
    usage: 'leave',
    description: 'Stop the music, flush the queue and disconnect.',
    isDMAllowed: false,
    isDeprecated: false,
    aliases: ['disconnect', 'dc', 'quit'],
    cooldown: 0,
    execute: async function(client, message, args) {
        const queue = message.client.queue.get(message.guild.id);

        if (!queue) {
            try {
                return message.channel.send(musicStrings.nothingPlaying);
            } catch (e) {
                console.error(e);
                throw new Tantrum(client, 'leave.js', 'Error on sending nothing playing message', e);
            }
        }

        if (!canModifyQueue(message.member)) {
            try {
                return message.channel.send(musicStrings.notInChannel);
            } catch (e) {
                console.error(e);
                throw new Tantrum(client, 'leave.js', 'Error on sending have to be in VC message', e);
            }
        }

        queue.songs = []; //flush queue (might be redundant)
        queue.connection.dispatcher.end(); // end connection
        queue.channel.leave(); // leave vc
        message.client.queue.delete(message.guild.id); // delete queue

        await message.react('👋'); //k byeeeeee
    },
};
