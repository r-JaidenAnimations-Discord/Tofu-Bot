const Discord = require('discord.js');
const { readJSONSync, writeJSONSync, read } = require('fs-extra');
const { teraID, retainedID ,maxID, tofuGreen, tofuError, tofuRed, tofuBlue, tofuOrange } = require('../../config.json');

module.exports = {
	name: 'settings',
	helpTitle: 'Settings',
	category: 'Bot Management',
	usage: 'i actually don\'t know yet',
	description: 'Set',
	isEnabled: true,
	isDMAllowed: false,
	isDeprecated: false,
	aliases: ['set', 'config'],
	cooldown: 5,
	execute: async function(client, message, args) {
        if (message.author.id !== teraID && message.author.id !== retainedID && message.author.id !== maxID) {
			return message.channel.send('No dude. I don\'t want anyone but my masters mess with code in the bot...');
				//.then(m => setTimeout(() => { m.delete(); }, 5000));
		}
        const readData = readJSONSync('./commanddata/Configuration/settings.json', 'utf-8');
		let { disabledCommands } = readData;
        const input = args[1];

        switch(args[0]) {

        case 'welcomer':
        case 'announce':
        case 'welcome': {
            /** @param {boolean} elem */
            const formatBool = (elem) => elem ? 'Enabled' : 'Disabled';

            readData.welcomer = !readData.welcomer; // Set

            const embed = new Discord.MessageEmbed()
                .setColor(tofuGreen)
                .setDescription(`\`${formatBool(readData.welcomer)}\` welcomer settings`)
                .setFooter('It might take some time while I restart!');

            await message.channel.send(embed);
            writeJSONSync('./commanddata/Configuration/settings.json', readData, { spaces: 4 });
            break;
        }

        case 'blacklisting':
        case 'blacklist': {
            /** @param {boolean} elem */
            const formatBool = (elem) => elem ? 'Enabled' : 'Disabled';

            readData.blacklisting = !readData.blacklisting; // Set

            const embed = new Discord.MessageEmbed()
                .setColor(tofuGreen)
                .setDescription(`\`${formatBool(readData.blacklist)}\` blacklisting settings`)
                .setFooter('It might take some time while I restart!');

            await message.channel.send(embed);
            writeJSONSync('./commanddata/Configuration/settings.json', readData, { spaces: 4 });
            break;
        }
        case 'enable': {
            if (input == 'all') {
                disabledCommands.splice(0, disabledCommands.length);
                await message.channel.send(
                    new Discord.MessageEmbed()
                        .setColor(tofuBlue)
                        .setDescription('Enabled all previously disabled commands')
                        .setFooter('It might take some time while I restart!'));
                writeJSONSync('./commanddata/Configuration/settings.json', readData, { spaces: 4 });
                return; 
            }

            if (!client.commands.get(input)) return message.channel.send(`There's not such command as \`${input}\`!`);
            if (!disabledCommands.includes(input)) return message.channel.send(`The command \`${input}\` is not disabled!`);

            const embed = new Discord.MessageEmbed()
                .setColor(tofuBlue)
                .setDescription(`Enabled the command \`${input}\``)
                .setFooter('It might take some time while I restart!');
            
            disabledCommands.splice(disabledCommands.indexOf(input), 1); // Set
            await message.channel.send(embed);
            writeJSONSync('./commanddata/Configuration/settings.json', readData, { spaces: 4 }); 
            break;
        }

        case 'disable': {
            if (!client.commands.get(input)) return message.channel.send(`There's not such command as \`${input}\`!`);
            if (disabledCommands.includes(input)) return message.channel.send(`The command \`${input}\` is already disabled!`);

            const embed = new Discord.MessageEmbed()
                .setColor(tofuRed)
                .setDescription(`Disabled the command \`${input}\``)
                .setFooter('It might take some time while I restart!');

            disabledCommands.push(input); // Set
            await message.channel.send(embed);
            writeJSONSync('./commanddata/Configuration/settings.json', readData, { spaces: 4 }); 
            break;
        }

        case 'list': {
            /** @param {boolean} elem */
            const formatBool = (elem) => elem ? 'Enabled' : 'Disabled';

            const embed = new Discord.MessageEmbed()
                .setColor(tofuBlue)
                .setDescription(
                    stripIndents`Welcomer: \`${formatBool(readData.welcomer)}\`
                Blacklisting: \`${formatBool(readData.blacklisting)}\`
                Disabled commands: \`${readData.disabledCommands.length ? readData.disabledCommands.join(', ') : 'None'}\``);

            message.channel.send(embed);
            break;
        }

        case 'reset': {
            let defaults = {
                welcomer: true,
                blacklisting: true,
                disabledCommands: []
            };
            if (readData == defaults) return message.channel.send('The bot is already in its default settings!');
            
            const embed = new Discord.MessageEmbed()
                .setColor(tofuOrange)
                .setDescription('Resetting to defaults')
                .setFooter('It might take some time while I restart!');

            await message.channel.send(embed);
            writeJSONSync('./commanddata/Configuration/settings.json', defaults, { spaces: 4 });
            break;
        }
        default: return message.channel.send('Invalid argument, please check the usage in the help command');
        }
	},
};