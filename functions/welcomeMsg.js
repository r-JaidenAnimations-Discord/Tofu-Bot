const Discord = require('discord.js');
const { botProfile, tofuBlue, generalChannelId } = require('../config.json');


let heyEnable = false;

// Enable or disable the randomised status
const toggleHeyEnable = (client, message, args) => {
    heyEnable = !heyEnable

    const heyaEmbed = new Discord.MessageEmbed()
                  .setColor(tofuBlue)
                  .setAuthor('Tofu Bot', botProfile)
                  .setDescription(`Welcome messages have been set to: ${heyEnable}`)
                  .setTimestamp()
                  .setFooter('Made with love');

    message.channel.send(heyaEmbed);
    console.log(`Heya cya set to: ${heyEnable}`);
}

const usrLeft = (client, member) => {
    console.log(heyEnable)
    if (heyEnable === false) return
    client.channels.cache.get(generalChannelId).send(`Welps, guess like **${member.displayName}** couldn't stand to be around us, adiós.`);
}

const usrJoin = (client, member) => {
    console.log(heyEnable)
    if (heyEnable === false) return
    client.channels.cache.get(generalChannelId).send(`Hello, <@${member.id}>. Welcome to r/JaidenAnimations!`);
}
   
module.exports = {
    toggleHeyEnable,
    usrJoin,
    usrLeft,
    heyEnable
};