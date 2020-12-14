const { botLogChannelId } = require('../config.json');

module.exports = {
    badWords: function(client, message) {
        if (message.author.bot) return;
        console.log('badwords triggered');
        const { foei } = require('./badWordList.js');
        if (!message.member.hasPermission('MANAGE_MESSAGES')) {
                if (foei.some(word => ` ${message.content.toLowerCase()} `.includes(` ${word} `))) {
                message.delete();
                   
                var role = message.guild.roles.cache.find(r => r.name === 'Muted');
                   
                message.member.roles.add(role);
                   
                setTimeout(async() => {
                    message.member.roles.remove(role);
                }, 10 /** 60 */* 1000);
             
                message.reply('That\'s a bad word right there, you are now muted for 10 minutes');
                client.channels.cache.get(botLogChannelId).send(`${message.member} has sent a bad word and it has been deleted \`\`\` ${message} \`\`\``);
                }
        }
    }
};