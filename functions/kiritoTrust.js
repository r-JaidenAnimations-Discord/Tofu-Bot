const Discord = require('discord.js');
const { botProfile, tofuBlue, banKirito, maxID, tofuError } = require('../config.json');

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
            try {
                console.log(e);
                client.users.cache.get(maxID).send(new Discord.MessageEmbed().setDescription(`BIG OOF: kiritoTrust.js: Error on sending kiritoState embed \n \`\`${e}\`\``).setColor(tofuError));
                return;
            } catch(f) {
                console.log('========================================================================================================');
                console.error(`kiritoTrust.js: Error on sending kiritoState embed, sending error DM failed: ${e} \n DMError: ${f}`);
                console.log('========================================================================================================');
                return;
            }
        }
    }
    else if (args[0] == 'enable') {
        kiritoTrusted = true;
    }
    else if (args[0] == 'disable') {
        kiritoTrusted = false;
    }
    else {
        try {
            return client.users.cache.get(message.author.id).send(`\`${args[0]}\` is not a valid argument. Allowed arguments are \`enable\` and \`disable\``);
        } catch (e) {
            try {
                console.log(e);
                client.users.cache.get(maxID).send(new Discord.MessageEmbed().setDescription(`BIG OOF: kiritoTrust.js: Error on sending invalid argument message \n \`\`${e}\`\``).setColor(tofuError));
                return;
            } catch(f) {
                console.log('========================================================================================================');
                console.error(`kiritoTrust.js: Error on sending invalid argument message, sending error DM failed: ${e} \n DMError: ${f}`);
                console.log('========================================================================================================');
                return;
            }
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
        try {
            console.log(e);
            client.users.cache.get(maxID).send(new Discord.MessageEmbed().setDescription(`BIG OOF: kiritoTrust.js: Error on sending kiritoEmbed \n \`\`${e}\`\``).setColor(tofuError));
            return;
        } catch(f) {
            console.log('========================================================================================================');
            console.error(`kiritoTrust.js: Error on sending kiritoEmbed, sending error DM failed: ${e} \n DMError: ${f}`);
            console.log('========================================================================================================');
            return;
        }
    }
}

const noKirito = (client, message, args) => {
    if (kiritoTrusted === true) {
        return;
    } else {
        try {
            return client.users.cache.get(banKirito).send('You know, I really don\'t trust you, like at all. So stop messaging me!', { files: ["./commanddata/banKirito.png"] });
        } catch (e) {
            try {
                console.log(e);
                client.users.cache.get(maxID).send(new Discord.MessageEmbed().setDescription(`BIG OOF: kiritoTrust.js: Error on sending nokirito DM \n \`\`${e}\`\``).setColor(tofuError));
                return;
            } catch(f) {
                console.log('========================================================================================================');
                console.error(`kiritoTrust.js: Error on sending nokirito DM, sending error DM failed: ${e} \n DMError: ${f}`);
                console.log('========================================================================================================');
                return;
            }
        }
    }
}

module.exports = {
    toggleKiritoTrust,
    noKirito,
    kiritoTrusted
};