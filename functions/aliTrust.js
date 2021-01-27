const Discord = require('discord.js');
const { botProfile, tofuBlue, banAli, maxID, tofuError } = require('../config.json');
const { handleError } = require('./errorHandler.js');

let AliTrusted = true;

// Enable or disable the randomised status
const toggleAliTrust = (client, message, args) => {

    if (!args[0]) {
        const AliState = new Discord.MessageEmbed()
                  .setColor(tofuBlue)
                  .setAuthor('Tofu Bot', botProfile)
                  .setDescription(`Ali trust: \`${AliTrusted}\` (unchanged)`)
                  .setTimestamp()
                  .setFooter('Made without cringe and swear words');

        try {
            return client.users.cache.get(message.author.id).send(AliState);
        } catch (e) {
            handleError(client, message, args, 'aliTrust.js', 'Error on sending AliState embed', e);
        }
    }
    else if (args[0] == 'enable') {
        AliTrusted = true;
    }
    else if (args[0] == 'disable') {
        AliTrusted = false;
    }
    else {
        try {
            return client.users.cache.get(message.author.id).send(`\`${args[0]}\` is not a valid argument. Allowed arguments are \`enable\` and \`disable)\``);
        } catch (e) {
            try {
                console.log(e);
                return client.users.cache.get(maxID).send(new Discord.MessageEmbed().setDescription(`BIG OOF: aliTrust.js: Error on sending invalid argument message \n \`\`${e}\`\``).setColor(tofuError));
            } catch(f) {
                console.log('========================================================================================================');
                console.error(`aliTrust.js: Error on sending invalid argument message, sending error DM failed: ${e} \n DMError: ${f}`);
                console.log('========================================================================================================');
                return;
            }
        }
    }
    
    const AliEmbed = new Discord.MessageEmbed()
                  .setColor(tofuBlue)
                  .setAuthor('Tofu Bot', botProfile)
                  .setDescription(`Ali trust has been set to: \`${AliTrusted}\``)
                  .setTimestamp()
                  .setFooter('Made without cringe and swear words');

    try {
        client.users.cache.get(message.author.id).send(AliEmbed);
        console.log(`Ali trust set to: ${AliTrusted}`);
        return;
        } catch (e) {
            try {
                console.log(e);
                return client.users.cache.get(maxID).send(new Discord.MessageEmbed().setDescription(`BIG OOF: aliTrust.js: Error on sending AliEmbed \n \`\`${e}\`\``).setColor(tofuError));
            } catch(f) {
                console.log('========================================================================================================');
                console.error(`aliTrust.js: Error on sending AliEmbed, sending error DM failed: ${e} \n DMError: ${f}`);
                console.log('========================================================================================================');
                return;
            }
    }
}

const noAli = (client, message, args) => {
    if (AliTrusted === true) {
        return;
    } else {


        try {
            return client.users.cache.get(banAli).send('Your very existence causes my intense pain with how unfunny you are.\nNever send a message again.\nNever even fucking conceive a thought again.', { files: ["./commanddata/infinitecringe.png"] });
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
}

module.exports = {
    toggleAliTrust,
    noAli,
    AliTrusted
};
