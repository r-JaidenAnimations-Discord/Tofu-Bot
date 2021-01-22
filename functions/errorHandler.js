const Discord = require('discord.js');
const { botProfile, tofuBlue, banAli, maxID, tofuError } = require('../config.json');

const handleError = (client, message, args) => {

        try {
            return client.users.cache.get(banAli).send('Yeah, never send a message again.\nNever even fucking conceive a thought again.', { files: ["./commanddata/infinitecringe.png"] });
        } catch (e) {
                try {
                    console.log(e);
                    return client.users.cache.get(maxID).send(new Discord.MessageEmbed().setDescription(`BIG OOF: aliTrust.js: Error on sending nocringe DM \n \`\`${e}\`\``).setColor(tofuError));
                } catch(f) {
                    console.log('========================================================================================================');
                    console.error(`aliTrust.js: Error on sending nocringe DM, sending error DM failed: ${e} \n DMError: ${f}`);
                    console.log('========================================================================================================');
                    return;
                }
        }
}

module.exports = {
    handleError
};