const Discord = require('discord.js');
const beautify = require('beautify');
const { teraID, retainedID ,maxID, tofuGreen, tofuError } = require('../../config.json');

const {apiKey} = require('../../config.json');

module.exports = {
	name: 'eval',
	helpTitle: 'Eval',
    category: 'Bot',
    usage: 'eval [string]',
    description: 'Evaluates JavaScript code inputed from args.\nOnwer Only Command\nSelfnote: don\'t use this next to many people idk they could take your token i guess lmao',
    isEnabled: true,
    isDeprecated: false,
	//aliases: [],
	cooldown: 5,
	execute: async function(client, message, args) {
        if (message.author.id !== teraID && message.author.id !== retainedID && message.author.id !== maxID) {
            return message.channel.send('No dude. I don\'t want anyone but my master mess with code in the bot...')
                //.then(m => setTimeout(() => { m.delete(); }, 5000));
        }

        if (!args[0]) { 
            return message.channel.send('Give me something to evaluate tho')
                //.then(m => setTimeout(() => { m.delete(); }, 5000));
        }

        try {
            if (args.join(' ').toLowerCase().includes('token')) return message.channel.send('oh nononono you\'re not getting the token you\'re NOT GETTING IT IDNFIABGDJDNWIKG');
            if (args.join(' ').toLowerCase().includes('key')) return message.channel.send('oh nononono you\'re not getting the token you\'re NOT GETTING IT IDNFIABGDJDNWIKG');
            

            const toEval = args.join(' ');
            const evaluated = eval(toEval);

            if (evaluated.includes(apiKey)) return message.channel.send('no.');

            console.log(typeof evaluated);

            if (toEval.toLowerCase().includes('token')) return message.channel.send('oh nononono you\'re not getting the token you\'re NOT GETTING IT IDNFIABGDJDNWIKG');
            if (toEval.toLowerCase().includes('apikey')) return message.channel.send('oh nononono you\'re not getting the token you\'re NOT GETTING IT IDNFIABGDJDNWIKG');

            let embed = new Discord.MessageEmbed()
                .setColor(tofuGreen)
                .setTimestamp()
                .setTitle('Eval')
                .addField('To Evaluate', `\`\`\`js\n${beautify(toEval, { format: 'js' })}\n\`\`\``)
                .addField('Evaluated', evaluated)
                .addField('Type of', typeof(evaluated))
                .setFooter(client.user.username, client.user.displayAvatarURL);

            message.channel.send(embed);
        } catch (e) {
            let embed = new Discord.MessageEmbed()
                .setColor(tofuError)
                .setTitle('Error')
                .setDescription(e)
                .setFooter(client.user.username, client.user.displayAvatarURL);

            message.channel.send(embed);
        }
        
// ... all your eval shit

//message.channel.send(eval(args.join(' ').replace(apiKey, 'funny token time')));
	},
};