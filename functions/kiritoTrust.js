const Discord = require('discord.js');
const { botProfile, tofuBlue, banKirito } = require('../config.json');
const { handleError } = require('./errorHandler.js');

let kiritoTrusted = true;

// Enable or disable the randomised status
const toggleKiritoTrust = (client, message, args) => {

    if (!args[0]) {
        const kiritoState = new Discord.MessageEmbed()
                  .setColor(tofuBlue)
                  .setAuthor('Tofu Bot', botProfile)
                  .setDescription(`Kirito trust: \`${kiritoTrusted}\` (unchanged)`)
                  .setTimestamp()
                  .setFooter('Made with love');

        try {
            return client.users.cache.get(message.author.id).send(kiritoState);
        } catch (e) {
            return handleError(client, message, args, 'kiritoTrust.js', 'Error on sending kiritoState embed', e);
        }
    }
    else if (args[0] == 'enable') {
        kiritoTrusted = true;
    }
    else if (args[0] == 'disable') {
        kiritoTrusted = false;
    } else {
        try {
            return client.users.cache.get(message.author.id).send(`\`${args[0]}\` is not a valid argument. Allowed arguments are \`enable\` and \`disable\``);
        } catch (e) {
            return handleError(client, message, args, 'kiritoTrust.js', 'Error on sending invalid argument message', e);
        }
    }
    
    const kiritoEmbed = new Discord.MessageEmbed()
                  .setColor(tofuBlue)
                  .setAuthor('Tofu Bot', botProfile)
                  .setDescription(`Kirito trust has been set to: \`${kiritoTrusted}\``)
                  .setTimestamp()
                  .setFooter('Made with love');
            
    try {
        client.users.cache.get(message.author.id).send(kiritoEmbed);
        console.log(`Kirito trust set to: ${kiritoTrusted}`);
        return;
    } catch (e) {
        return handleError(client, message, args, 'kiritoTrust.js', 'Error on sending kiritoEmbed', e);
    }
}

const noKirito = (client, message, args) => {
    if (kiritoTrusted === true) {
        return;
    } else {
        try {
            return client.users.cache.get(banKirito).send('You know, I really don\'t trust you, like at all. So stop messaging me!', { files: ["./commanddata/banKirito.png"] });
        } catch (e) {
            return handleError(client, message, args, 'kiritoTrust.js', 'Error on sending nokirito DM', e);
        }
    }
}

module.exports = {
    toggleKiritoTrust,
    noKirito,
    kiritoTrusted
};