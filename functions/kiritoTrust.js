const Discord = require('discord.js');
const { botProfile, tofuBlue, banKirito } = require('../config.json');

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

        return client.users.cache.get(message.author.id).send(kiritoState);
    }
    else if (args[0] == 'enable') {
        kiritoTrusted = true;
    }
    else if (args[0] == 'disable') {
        kiritoTrusted = false;
    }
    else {
        return client.users.cache.get(message.author.id).send(`\`${args[0]}\` is not a valid argument. Allowed arguments are 'enable' and 'disable'`);
    }
    
    const kiritoEmbed = new Discord.MessageEmbed()
                  .setColor(tofuBlue)
                  .setAuthor('Tofu Bot', botProfile)
                  .setDescription(`Welcome messages have been set to: \`${kiritoTrusted}\``)
                  .setTimestamp()
                  .setFooter('Made with love');

    client.users.cache.get(message.author.id).send(kiritoEmbed);
    console.log(`Kirito trust set to: ${kiritoTrusted}`);
}

const noKirito = (client, message, args) => {
    if (kiritoTrusted === true) {
        return;
    } else {
        return client.users.cache.get(banKirito).send('You know, I really don\'t trust you, like at all. So stop messaging me!', { files: ["./commanddata/banKirito.png"] });
    }
}

module.exports = {
    toggleKiritoTrust,
    noKirito,
    kiritoTrusted
};