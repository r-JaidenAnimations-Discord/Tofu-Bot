const { tofuGreen } = require('#colors');
const Discord = require('discord.js');
const Tantrum = require('#tantrum');
const { readJSONSync, writeJSONSync } = require('fs-extra');

/**
 * Either enables or disables a setting depending on 
 * @param {Object} message Message object
 * @param {String} setting The setting to change
 * @param {String} state Argument to either enable or disable the setting
 */
const updateSetting = async (client, message, setting, state) => {

	const readData = readJSONSync('./deployData/settings.json', 'utf-8');

	switch (state) {
		case 'enable':
		case 'true':
		case 'on': {
			if (readData[setting] === true) {
				return message.channel.send(`${setting} is already \`enabled\``).catch(e => {
					throw new Tantrum(client, 'settingsManager.js', 'Error on sending setting already enabled message.', e);
				});
			} else {
				readData[setting] = true; // Enable the setting thing

				const formatBool = (elem) => elem ? 'Enabled' : 'Disabled';
				const embed = new Discord.MessageEmbed()
					.setColor(tofuGreen)
					.setDescription(`\`${formatBool(readData[setting])}\` ${setting} settings`)
					.setTimestamp()
					.setFooter('Made with love');

				await message.channel.send({ embeds: [embed] });
				writeJSONSync('./deployData/settings.json', readData, { spaces: 4 });
			}
			break;
		}
		case 'disable':
		case 'false':
		case 'off': {
			if (readData[setting] === false) {
				return message.channel.send(`${setting} is already \`disabled\``).catch(e => {
					throw new Tantrum(client, 'settingsManager.js', 'Error on sending setting already disabled message.', e);
				});
			} else {
				readData[setting] = false; // Disable the setting thing

				const formatBool = (elem) => elem ? 'Enabled' : 'Disabled';
				const embed = new Discord.MessageEmbed()
					.setColor(tofuGreen)
					.setDescription(`\`${formatBool(readData[setting])}\` ${setting} settings`)
					.setTimestamp()
					.setFooter('Made with love');

				await message.channel.send({ embeds: [embed] });
				writeJSONSync('./deployData/settings.json', readData, { spaces: 4 });
			}
			break;
		}
		default: {
			const formatBool = (elem) => elem ? 'enabled' : 'disabled';

			const stateEmbed = new Discord.MessageEmbed()
				.setColor(tofuGreen)
				.setDescription(`${setting} settings are currently \`${formatBool(readData[setting])}\`.`);

			message.channel.send({ embeds: [stateEmbed] }).catch(e => {
				throw new Tantrum(client, 'settingsManager.js', 'Error on sending stateEmbed', e);
			});
			break;
		}
	}
}

module.exports = {
	updateSetting
}
