const Discord = require('discord.js');
const { prefix, infonetOrange } = require('../../config.json');
const { stripIndents } = require('common-tags');

module.exports = {
	name: 'help',
	helpTitle: 'Help',
    category: 'Bot',
    usage: 'help (command)',
    description: 'Stop, get help',
	isEnabled: true,
	aliases: ['commands'],
    cooldown: 5,
	execute: async function(client, message, args) {
        message.channel.bulkDelete(1, true).catch(err => {
			console.error(err);
			message.channel.send('Something went *very* wrong, I\'m sorry.');
			console.error('Basically, without saying too much, you\'re screwed. Royally');
		});
		//message.channel.send('This is unfinished and i don\t know how to start');
        if (args[0]) {
            return getCmd(client, message, args[0]);
        } else {
            return getAll(client, message);
        }	
	},
};

function getAll(client, message) {
    const embed = new Discord.MessageEmbed()
        .setColor(infonetOrange)
        .setFooter('Syntax: () = optional, [] = required, {a, b} = choose between a or b');
    
    const commands = (category) => {
        return client.commands
            .filter(cmd => cmd.category === category)
            .map(cmd => `\`${cmd.name}\``)
            .join(' ');
    };

    const info = client.categories 
        .map(cat => stripIndents`**${cat[0].toUpperCase() + cat.slice(1)}** \n\n${commands(cat)}`)
        .reduce((string, category) => string + '\n\n' + category);
 
    return message.channel.send(embed.setDescription(info));
}

function getCmd(client, message, input) {
    const embed = new Discord.MessageEmbed()
        .setColor('#eb8334')
        .setFooter('Syntax: () = optional; [] = required; {a, b} = choose between a or b');

    const cmd = client.commands.get(input.toLowerCase()) || client.commands.get(client.aliases.get(input.toLowerCase()));

    if (!cmd) {
        return message.channel.send(`**${input.toLowerCase()}** is not a command. (or it's an alias)`);
    }

    if (cmd.name) embed.setDescription(`**${cmd.helpTitle} command**`);
    if (cmd.aliases) embed.addField('**Aliases**', `${cmd.aliases.map(a => `\`${a}\``).join(' ')}`);
    if (cmd.description) embed.addField('**Command Description**', `${cmd.description}`);
    if (cmd.usage) embed.addField('**Command Structure**', `\`${prefix}${cmd.usage}\``);

    return message.channel.send(embed);
}