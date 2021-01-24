const Discord = require('discord.js');
const owofy = require('owofy');

module.exports = {
    name: 'owoify',
    helpTitle: 'OwOify',
    category: 'Fun',
    usage: 'owoify [text]',
    description: 'OwO what\'s this',
    isEnabled: true,
    aliases: ['owofy'],
    cooldown: 5,

    run: async(bot, message, args) => {
        if (args.length < 1) return message.channel.send('You must input text to be reversed!');
        if (message.deletable) message.delete();

        let input = args.join(' ');

        // Supress @everyone, @here and pinging roles
        [/@everyone/gi, /@here/gi, /<@&\d{18}>/].forEach(ping => {
            input = input.replace(ping, '');
        });

        const owo = owofy(input);
        message.channel.send(owo);
    }
};