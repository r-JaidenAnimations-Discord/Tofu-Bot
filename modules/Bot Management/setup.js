const { tofuRed, tofuBlue, tofuOrange } = require('#colors');
const Discord = require('discord.js');
const Tantrum = require('#tantrum');
const { stripIndents } = require('common-tags');
const { readJSONSync, writeJSONSync } = require('fs-extra');
const { masterCheck } = require('#utils/staffChecks.js');
const { updateSetting } = require('#utils/settingsManager.js');


module.exports = {
	name: 'settings',
	helpTitle: 'Settings',
	category: 'Bot Management',
	usage: 'settings {[{enable, disable}] [command], [{welcomer, announce, welcome, greeting, alitrust, ali, kirito, kiritotrust, bankirito}] [{enable, disable}]}',
	description: 'Change bot settings.',
	isDMAllowed: false,
	isDangerous: true,
	mainServerOnly: false,
	isHidden: false,
	aliases: ['set', 'config'],
	cooldown: 5,
	execute: async function(client, message, args) {

		if (!masterCheck(client, message)) return;

		const readData = readJSONSync('./deployData/settings.json', 'utf-8');
		let { disabledCommands } = readData;
		const input = args[1];

		switch (args[0]) {

			// Adjusting settings for the welcome command.
			case 'welcomer':
			case 'announce':
			case 'welcome':
			case 'greeting': {
				updateSetting(client, message, 'welcome', args[1]);
				break;
			}

			// Kiritotrust
			case 'kirito':
			case 'bankirito':
			case 'kiritotrust': {
				updateSetting(client, message, 'kiritoTrust', args[1]);
				break;
			}

			// Alitrust
			case 'ali':
			case 'alitrust': {
				updateSetting(client, message, 'aliTrust', args[1]);
				break;
			}

			// Random status
			case 'randomstatus':
			case 'rstatus':
			case 'rstat':
			case 'rsts':
			case 'status': {
				updateSetting(client, message, 'randomStatus', args[1]);
				break;
			}

			// Blacklisting
			case 'blacklist':
			case 'bl':
			case 'blacklisting': {
				updateSetting(client, message, 'blackListing', args[1]);
				break;
			}

			// Autoresponders
			case 'autoresponders':
			case 'ar': {
				updateSetting(client, message, 'autoResponders', args[1]);
				break;
			}

			// Setting the commands
			case 'enable': {
				if (input === 'all') {
					disabledCommands.splice(0, disabledCommands.length);
					await message.channel.send({
						embeds: [
							new Discord.MessageEmbed()
								.setColor(tofuBlue)
								.setDescription('Enabled all previously disabled commands')
								.setTimestamp()
								.setFooter('Made with love')
						]
					});
					writeJSONSync('./deployData/settings.json', readData, { spaces: 4 });
					return;
				}

				if (!client.commands.get(input)) return message.channel.send('There\'s no such command! Make sure you are not using an alias.');
				if (!disabledCommands.includes(input)) return message.channel.send(`The command \`${input}\` is not disabled!`);

				const embed = new Discord.MessageEmbed()
					.setColor(tofuBlue)
					.setDescription(`Enabled the command \`${input}\``)
					.setTimestamp()
					.setFooter('Made with love');

				disabledCommands.splice(disabledCommands.indexOf(input), 1); // Set
				await message.channel.send({ embeds: [embed] });
				writeJSONSync('./deployData/settings.json', readData, { spaces: 4 });
				break;
			}

			case 'disable': {
				if (!client.commands.get(input)) return message.channel.send('There\'s no such command! Make sure you are not using an alias.');
				if (disabledCommands.includes(input)) return message.channel.send(`The command \`${input}\` is already disabled!`);
				if (input === 'settings') return message.channel.send('HAHAHAHAHAHAHAHAHAHAHHAHAHHAHAHAHHA very funni');

				const embed = new Discord.MessageEmbed()
					.setColor(tofuRed)
					.setDescription(`Disabled the command \`${input}\``)
					.setTimestamp()
					.setFooter('Made with love');

				disabledCommands.push(input); // Set
				await message.channel.send({ embeds: [embed] });
				writeJSONSync('./deployData/settings.json', readData, { spaces: 4 });
				break;
			}

			case 'reset': {
				const defaults = readJSONSync('./assets/Configuration/defaults.json', 'utf-8');

				if (JSON.stringify(readData) === JSON.stringify(defaults)) return message.channel.send('The bot is already in its default settings!');

				const embed = new Discord.MessageEmbed()
					.setColor(tofuOrange)
					.setDescription('Reset to defaults')
					.setTimestamp()
					.setFooter('Made with love');

				await message.channel.send({ embeds: [embed] });
				writeJSONSync('./deployData/settings.json', defaults, { spaces: 4 });
				break;
			}
			case 'list':
			default: {
				const formatBool = (elem) => elem ? 'Enabled' : 'Disabled';

				const embed = new Discord.MessageEmbed()
					.setColor(tofuBlue)
					.setDescription(
						stripIndents`Welcome Messages: \`${formatBool(readData.welcome.state)}\`
					Kirito Trust: \`${formatBool(readData.kiritoTrust.state)}\`
					Ali Trust: \`${formatBool(readData.aliTrust.state)}\`
					Random status: \`${formatBool(readData.randomStatus.state)}\`
					Blacklisting: \`${formatBool(readData.blackListing.state)}\`
					Minecraft Maintenance: \`${formatBool(readData.minecraftMaintenance.state)}\`
					Autoresponders: \`${formatBool(readData.autoResponders.state)}\`
					Disabled commands: \`${readData.disabledCommands.length ? readData.disabledCommands.join(', ') : 'None'}\``);

				message.channel.send({ embeds: [embed] }).catch(e => {
					new Tantrum(client, 'setup.js', 'Error on sending settings list', e);
				});
			}
		}
	},
};
