//const { teraID, retainedID, maxID, tofuGreen, tofuBlue } = require('../../config.json');
const { tofuGreen, tofuBlue } = require('#colors');
const Discord = require('discord.js');
const Tantrum = require('#tantrum');
const { readJSONSync, writeJSONSync } = require('fs-extra');

module.exports = {
	name: 'minecraftmaintenance',
	helpTitle: 'Minecraft',
	category: 'Minecraft',
	usage: 'minecraft',
	description: 'Show info about our minecraft server!',
	isDMAllowed: false,
	isDeprecated: false,
	isDangerous: true,
	isHidden: false,
	aliases: ['mcm', 'minecraffmaintenance', 'minecrapmaintenance'],
	cooldown: 0,
	execute: async function(client, message, args) {
		const { teraID, retainedID, maxID/*, tofuGreen, tofuBlue*/ } = client.config;

		if (message.author.id !== teraID && message.author.id !== retainedID && message.author.id !== maxID) {
			return message.channel.send('No dude. I don\'t want anyone but my masters mess with code in the bot...');
		}

		const readData = readJSONSync('./deployData/settings.json', 'utf-8');

		// Do we have more args?
		switch (args[0]) {
			case 'enable':
			case 'true':
			case 'on': {
				if (readData.minecraftMaintenance === true) {
					try {
						return message.channel.send('Minecraft maintenance mode already `enabled`');
					} catch (e) {
						throw new Tantrum(client, 'mcMaintenance.js', 'Error on sending maintenance already enabled message.', e);
					}
				} else {
					readData.minecraftMaintenance = true; // Enable the maintenance thing

					const formatBool = (elem) => elem ? 'Enabled' : 'Disabled';
					const embed = new Discord.MessageEmbed()
						.setColor(tofuGreen)
						.setDescription(`\`${formatBool(readData.minecraftMaintenance)}\` Minecraft maintenance mode`)
						.setTimestamp()
						.setFooter('Made with love');

					await message.channel.send(embed);
					writeJSONSync('./deployData/settings.json', readData, { spaces: 4 });
				}
				break;
			}
			case 'disable':
			case 'false':
			case 'off': {
				if (readData.minecraftMaintenance === false) {
					try {
						return message.channel.send('Minecraft maintenance mode already `disabled`');
					} catch (e) {
						throw new Tantrum(client, 'mcMaintenance.js', 'Error on sending maintenance already disabled message.', e);
					}
				} else {
					readData.minecraftMaintenance = false; // Disable the maintenance thing

					const formatBool = (elem) => elem ? 'Enabled' : 'Disabled';
					const embed = new Discord.MessageEmbed()
						.setColor(tofuGreen)
						.setDescription(`\`${formatBool(readData.minecraftMaintenance)}\` Minecraft maintenance mode`)
						.setTimestamp()
						.setFooter('Made with love');

					await message.channel.send(embed);
					writeJSONSync('./deployData/settings.json', readData, { spaces: 4 });
				}
				break;
			}
			default: {
				const formatBool = (elem) => elem ? 'enabled' : 'disabled';

				const embed = new Discord.MessageEmbed()
					.setColor(tofuBlue)
					.setDescription(`Minecraft maintenance mode is \`${formatBool(readData.minecraftMaintenance)}\``)
					.setTimestamp()
					.setFooter('Made with love');

				try {
					message.channel.send(embed);
				} catch (e) {
					new Tantrum(client, 'mcMaintenance.js', 'Error on sending maintenance mode status', e);
				}
			}
		}
	},
};
