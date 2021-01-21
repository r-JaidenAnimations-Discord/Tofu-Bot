const Discord = require('discord.js');
const { randomStatus } = require('../../functions/statusFunction.js');
const { staffChatId, maxID, tofuError } = require('../../config.json');

module.exports = client => {
    randomStatus(client)
    console.log(`Alive as ${client.user.tag}`);

    try {
        client.channels.cache.get(staffChatId).send(`I'm back b!tches!`);
    } catch (e) {
        try {
            console.log(e);
            return client.users.cache.get(maxID).send(new Discord.MessageEmbed().setDescription(`BIG OOF: ready.js: Error on sending i'm back \n \`\`${e}\`\``).setColor(tofuError));
        } catch(f) {
            console.log('========================================================================================================');
            console.error(`ready.js: Error on sending i'm back, sending error DM failed: ${e} \n DMError: ${f}`);
            console.log('========================================================================================================');
            return;
        }
    }

}