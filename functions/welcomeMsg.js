const Discord = require('discord.js');
const { botProfile, tofuBlue, generalChannelId } = require('../config.json');
const { handleError } = require('./errorHandler.js');


let heyEnable = false;

// Enable or disable the randomised status
const toggleHeyEnable = (client, message, args) => {
    //heyEnable = !heyEnable

    console.log(args);
    console.log(args[0]);
    if (!args[0]) {
        const heyaState = new Discord.MessageEmbed()
                  .setColor(tofuBlue)
                  .setAuthor('Tofu Bot', botProfile)
                  .setDescription(`Welcome messages: \`${heyEnable}\` (unchanged)`)
                  .setTimestamp()
                  .setFooter('Made with love');

        try {
            return message.channel.send(heyaState);
        } catch (e) {
            return handleError(client, message, args, 'welcomeMsg.js', 'Error on sending the heyaState embed', e);
        }
    }
    else if (args[0] == 'enable') {
        heyEnable = true;
    }
    else if (args[0] == 'disable') {
        heyEnable = false;
    }
    else {
        try {
            return message.channel.send(`\`${args[0]}\` is not a valid argument. Allowed arguments are \`enable\` and \`disable\``);
        } catch (e) {
            
            return handleError(client, message, args, 'welcomeMsg.js', 'Error on sending the invalid argument message', e);
        }
    }
    
    const heyaEmbed = new Discord.MessageEmbed()
                  .setColor(tofuBlue)
                  .setAuthor('Tofu Bot', botProfile)
                  .setDescription(`Welcome messages have been set to: \`${heyEnable}\``)
                  .setTimestamp()
                  .setFooter('Made with love');

    try {
        message.channel.send(heyaEmbed);
        console.log(`Heya cya set to: ${heyEnable}`);
    } catch (e) {
        return handleError(client, message, args, 'welcomeMsg.js', 'Error on sending heyaEmbed', e);
    }
}

const usrLeft = async (client, member) => {
    console.log(heyEnable);
    if (heyEnable === false) return;
    try {
        return client.channels.cache.get(generalChannelId).send(`Welps, guess like **${member.displayName}** couldn't stand to be around us, adiós.`);
    } catch(e) {
        return handleError(client, message, args, 'welcomeMsg.js', 'Error on sending cya message', e);
    }
}

const usrJoin = async (client, member) => {
    console.log(heyEnable);
    if (heyEnable === false) return;
    try {
        return client.channels.cache.get(generalChannelId).send(`Hello, <@${member.id}>. Welcome to r/JaidenAnimations!\n\nPlease make sure to read <#755180458563600445> and the pinned comments / topics for this and other channels`);
    } catch(e) {
        return handleError(client, message, args, 'welcomeMsg.js', 'Error on sending welcome message', e);
    }
}
   
module.exports = {
    toggleHeyEnable,
    usrJoin,
    usrLeft,
    heyEnable
};
