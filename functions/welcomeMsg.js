const Discord = require('discord.js');
const { botProfile, tofuBlue, generalChannelId } = require('../config.json');


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

        return message.channel.send(heyaState);
    }
    else if (args[0] == 'enable') {
        heyEnable = true;
    }
    else if (args[0] == 'disable') {
        heyEnable = false;
    }
    else {
        return message.channel.send(`\`${args[0]}\` is not a valid argument. Allowed arguments are 'enable' and 'disable'`);
    }
    
    const heyaEmbed = new Discord.MessageEmbed()
                  .setColor(tofuBlue)
                  .setAuthor('Tofu Bot', botProfile)
                  .setDescription(`Welcome messages have been set to: \`${heyEnable}\``)
                  .setTimestamp()
                  .setFooter('Made with love');

    message.channel.send(heyaEmbed);
    console.log(`Heya cya set to: ${heyEnable}`);
}

const usrLeft = (client, member) => {
    console.log(heyEnable);
    if (heyEnable === false) return;
    client.channels.cache.get(generalChannelId).send(`Welps, guess like **${member.displayName}** couldn't stand to be around us, adiós.`);
}

const usrJoin = (client, member) => {
    console.log(heyEnable);
    if (heyEnable === false) return;
    client.channels.cache.get(generalChannelId).send(`Hello, <@${member.id}>. Welcome to r/JaidenAnimations!`);
}
   
module.exports = {
    toggleHeyEnable,
    usrJoin,
    usrLeft,
    heyEnable
};