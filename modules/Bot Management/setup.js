const Discord = require('discord.js');
const { stripIndents } = require('common-tags');
const { readJSONSync, writeJSONSync, read, readdir } = require('fs-extra');
const { teraID, retainedID ,maxID, tofuGreen, tofuError, tofuRed, tofuBlue, tofuOrange } = require('../../config.json');
const { handleError } = require('../../functions/errorHandler.js');

module.exports = {
	name: 'settings',
	helpTitle: 'Settings',
	category: 'Bot Management',
	usage: 'settings {[{enable, disable}] [command], [{welcomer, announce, welcome, greeting, alitrust, ali, kirito, kiritotrust, bankirito}] [{enable, disable}]}',
	description: 'Set',
	isDMAllowed: false,
	isDeprecated: false,
	aliases: ['set', 'config'],
	cooldown: 5,
	execute: async function(client, message, args) {
		if (message.author.id !== teraID && message.author.id !== retainedID && message.author.id !== maxID) {
			return message.channel.send('No dude. I don\'t want anyone but my masters mess with code in the bot...');
		}

		const readData = readJSONSync('./commanddata/Configuration/settings.json', 'utf-8');
		let { disabledCommands } = readData;
		const input = args[1];

		switch(args[0]) {

			// Adjusting settings for the welcome command.
			case 'welcomer':
			case 'announce':
			case 'welcome':
			case 'greeting': {

				// Do we have more args?
				switch(args[1]) {
					case 'enable':
					case 'true':
					case 'on': {
						if (readData.welcome === true) {
							try {
								return message.channel.send('The welcomer is already `enabled`');
							} catch (e) {
								return handleError(client, 'setup.js', 'Error on sending welcomer already enabled message.', e);
							}
						} else {
							readData.welcome = true; // Enable the welcome thing

							const formatBool = (elem) => elem ? 'Enabled' : 'Disabled';
							const embed = new Discord.MessageEmbed()
								.setColor(tofuGreen)
								.setDescription(`\`${formatBool(readData.welcome)}\` welcomer settings`)
								.setTimestamp()
								.setFooter('Made with love');

							await message.channel.send(embed);
							writeJSONSync('./commanddata/Configuration/settings.json', readData, { spaces: 4 });
						}
						break;
					}
					case 'disable':
					case 'false':
					case 'off': {
						if (readData.welcome === false) {
							try {
								return message.channel.send('The welcomer is already `disabled`');
							} catch (e) {
								return handleError(client, 'setup.js', 'Error on sending welcomer already disabled message.', e);
							}
						} else {
							readData.welcome = false; // Disable the welcome thing

							const formatBool = (elem) => elem ? 'Enabled' : 'Disabled';
							const embed = new Discord.MessageEmbed()
								.setColor(tofuGreen)
								.setDescription(`\`${formatBool(readData.welcome)}\` welcomer settings`)
								.setTimestamp()
								.setFooter('Made with love');

							await message.channel.send(embed);
							writeJSONSync('./commanddata/Configuration/settings.json', readData, { spaces: 4 });
						}
						break;
					}
					default: {
						const formatBool = (elem) => elem ? 'enabled' : 'disabled';

						const welcomerStateEmbed = new Discord.MessageEmbed()
						.setColor(tofuGreen)
						.setDescription(`Welcome messages are currently \`${formatBool(readData.welcome)}\`.`);

						try {
							message.channel.send(welcomerStateEmbed);
						} catch (e) {
							return handleError(client, 'setup.js', 'Error on sending WelcomerStateEmbed', e);
						}
						break;
					}
					//end of inner switchcase
				}//Point of dev || WORKS UNTIL HERE
				break;
			}

			// Kiritotrust
			case 'kirito':
			case 'bankirito':
			case 'kiritotrust': {
				
				// Do we have more args?
				switch(args[1]) {
					case 'enable':
					case 'true':
					case 'on': {
						if (readData.kiritoTrust === true) {
							try {
								return message.channel.send('Kiritotrust is already `enabled`');
							} catch (e) {
								return handleError(client, 'setup.js', 'Error on sending kiritotrust already enabled message.', e);
							}
						} else {
							readData.kiritoTrust = true; // Enable the kiritotrust thing
						
							const formatBool = (elem) => elem ? 'Enabled' : 'Disabled';
							const embed = new Discord.MessageEmbed()
								.setColor(tofuGreen)
								.setDescription(`\`${formatBool(readData.kiritoTrust)}\` kiritotrust settings`)
								.setTimestamp()
								.setFooter('Made with love');
						
							await message.channel.send(embed);
							writeJSONSync('./commanddata/Configuration/settings.json', readData, { spaces: 4 });
						}
						break;
					}
					case 'disable':
					case 'false':
					case 'off': {
						if (readData.kiritoTrust === false) {
							try {
								return message.channel.send('Kiritotrust is already `disabled`');
							} catch (e) {
								return handleError(client, 'setup.js', 'Error on sending kiritotrust already disabled message.', e);
							}
						} else {
							readData.kiritoTrust = false; // Disable the kiritotrust thing
						
							const formatBool = (elem) => elem ? 'Enabled' : 'Disabled';
							const embed = new Discord.MessageEmbed()
								.setColor(tofuGreen)
								.setDescription(`\`${formatBool(readData.kiritoTrust)}\` kiritotrust settings`)
								.setTimestamp()
								.setFooter('Made with love');
						
							await message.channel.send(embed);
							writeJSONSync('./commanddata/Configuration/settings.json', readData, { spaces: 4 });
						}
						break;
					}
					default: {
						const formatBool = (elem) => elem ? 'enabled' : 'disabled';
					
						const kiritotrustStateEmbed = new Discord.MessageEmbed()
						.setColor(tofuGreen)
						.setDescription(`Kirito trust currently \`${formatBool(readData.kiritoTrust)}\`.`);
					
						try {
							message.channel.send(kiritotrustStateEmbed);
						} catch (e) {
							return handleError(client, 'setup.js', 'Error on sending kiritotrustStateEmbed', e);
						}
						break;
					}
					//end of inner switchcase
				}
				break;
			}

			// Alitrust
			case 'ali':
			case 'alitrust': {
				
				// Do we have more args?
				switch(args[1]) {
					case 'enable':
					case 'true':
					case 'on': {
						if (readData.aliTrust === true) {
							try {
								return message.channel.send('Alitrust is already `enabled`');
							} catch (e) {
								return handleError(client, 'setup.js', 'Error on sending alitrust already enabled message.', e);
							}
						} else {
							readData.aliTrust = true; // Enable the alitrust thing
						
							const formatBool = (elem) => elem ? 'Enabled' : 'Disabled';
							const embed = new Discord.MessageEmbed()
								.setColor(tofuGreen)
								.setDescription(`\`${formatBool(readData.aliTrust)}\` alitrust settings`)
								.setTimestamp()
								.setFooter('Made with love');
						
							await message.channel.send(embed);
							writeJSONSync('./commanddata/Configuration/settings.json', readData, { spaces: 4 });
						}
						break;
					}
					case 'disable':
					case 'false':
					case 'off': {
						if (readData.aliTrust === false) {
							try {
								return message.channel.send('Alitrust is already `disabled`');
							} catch (e) {
								return handleError(client, 'setup.js', 'Error on sending alitrust already disabled message.', e);
							}
						} else {
							readData.aliTrust = false; // Disable the alitrust thing
						
							const formatBool = (elem) => elem ? 'Enabled' : 'Disabled';
							const embed = new Discord.MessageEmbed()
								.setColor(tofuGreen)
								.setDescription(`\`${formatBool(readData.aliTrust)}\` alitrust settings`)
								.setTimestamp()
								.setFooter('Made with love');
						
							await message.channel.send(embed);
							writeJSONSync('./commanddata/Configuration/settings.json', readData, { spaces: 4 });
						}
						break;
					}
					default: {
						const formatBool = (elem) => elem ? 'enabled' : 'disabled';
					
						const alitrustStateEmbed = new Discord.MessageEmbed()
						.setColor(tofuGreen)
						.setDescription(`Ali trust currently \`${formatBool(readData.aliTrust)}\`.`);
					
						try {
							message.channel.send(alitrustStateEmbed);
						} catch (e) {
							return handleError(client, 'setup.js', 'Error on sending alitrustStateEmbed', e);
						}
						break;
					}
					//end of inner switchcase
				}
				break;
			}

			// Setting the commands
			case 'enable': {
				if (input == 'all') {
					disabledCommands.splice(0, disabledCommands.length);
					await message.channel.send(
						new Discord.MessageEmbed()
							.setColor(tofuBlue)
							.setDescription('Enabled all previously disabled commands')
							.setTimestamp()
							.setFooter('Made with love'));
					writeJSONSync('./commanddata/Configuration/settings.json', readData, { spaces: 4 });
					return; 
				}

				if (!client.commands.get(input)) return message.channel.send('There\'s not such command! Make sure you are not using an alias.');
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
				if (!client.commands.get(input)) return message.channel.send('There\'s not such command! Make sure you are not using an alias.');
				if (disabledCommands.includes(input)) return message.channel.send(`The command \`${input}\` is already disabled!`);
				if (input == 'settings') return message.channel.send('HAHAHAHAHAHAHAHAHAHAHHAHAHHAHAHAHHA very funni');

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
				const formatBool = (elem) => elem ? 'Enabled' : 'Disabled';

				const embed = new Discord.MessageEmbed()
					.setColor(tofuBlue)
					.setDescription(
						stripIndents`Welcome Messages: \`${formatBool(readData.welcome)}\`
					Kirito Trust: \`${formatBool(readData.kiritoTrust)}\`
					Ali Trust: \`${formatBool(readData.kiritoTrust)}\`
					Disabled commands: \`${readData.disabledCommands.length ? readData.disabledCommands.join(', ') : 'None'}\``);

				try {
					message.channel.send(embed);
				} catch (e) {
					handleError(client, 'setup.js', 'Error on sending settings list', e);
				}
				break;
			}

			case 'reset': {
				/*let defaults = {
					welcomer: true,
					blacklisting: true,
					disabledCommands: []
				};*/

				const defaults = readJSONSync('./commanddata/Configuration/defaults.json', 'utf-8');

				if (JSON.stringify(readData) === JSON.stringify(defaults)) return message.channel.send('The bot is already in its default settings!');
		
				const embed = new Discord.MessageEmbed()
					.setColor(tofuOrange)
					.setDescription('Resetting to defaults')
					.setFooter('It might take some time while I restart!');

				await message.channel.send(embed);
				writeJSONSync('./commanddata/Configuration/settings.json', defaults, { spaces: 4 });
				break;
			}
			default: {
				const formatBool = (elem) => elem ? 'Enabled' : 'Disabled';

				const embed = new Discord.MessageEmbed()
					.setColor(tofuBlue)
					.setDescription(
						stripIndents`Welcome Messages: \`${formatBool(readData.welcome)}\`
					Kirito Trust: \`${formatBool(readData.kiritoTrust)}\`
					Ali Trust: \`${formatBool(readData.kiritoTrust)}\`
					Disabled commands: \`${readData.disabledCommands.length ? readData.disabledCommands.join(', ') : 'None'}\``);
				
				try {
					message.channel.send(embed);
				} catch (e) {
					handleError(client, 'setup.js', 'Error on sending settings list', e);
				}
			}
		}
	},
};
