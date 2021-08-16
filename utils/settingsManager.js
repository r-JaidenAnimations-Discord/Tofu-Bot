const { tofuGreen, tofuOrange } = require('#colors');
const Discord = require('discord.js');
const Tantrum = require('#tantrum');
const { readJSONSync, writeJSONSync } = require('fs-extra');

/**
 * Either enables or disables a setting depending on 
 * @param {Object} message Message object
 * @param {String} setting The setting to change
 * @param {String} selectedState Argument to either enable or disable the setting
 */
const updateSetting = async (client, message, setting, selectedState) => {

	const readData = readJSONSync('./deployData/settings.json', 'utf-8');

	switch (selectedState) {
		case 'enable':
		case 'true':
		case 'on': {
			if (readData[setting].state === true) {
				return message.channel.send({ embeds: [new Discord.MessageEmbed().setColor(tofuOrange).setDescription(`${readData[setting].humanizedString} setting is already \`enabled\``)] }).catch(e => {
					throw new Tantrum(client, 'settingsManager.js', 'Error on sending setting already enabled message.', e);
				});
			} else {
				readData[setting].state = true; // Enable the setting thing

				const formatBool = (elem) => elem ? 'Enabled' : 'Disabled';
				const embed = new Discord.MessageEmbed()
					.setColor(tofuGreen)
					.setDescription(`\`${formatBool(readData[setting].state)}\` ${readData[setting].humanizedString} settings`)
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
			if (readData[setting].state === false) {
				return message.channel.send({ embeds: [new Discord.MessageEmbed().setColor(tofuOrange).setDescription(`${readData[setting].humanizedString} is already \`disabled\``)] }).catch(e => {
					throw new Tantrum(client, 'settingsManager.js', 'Error on sending setting already disabled message.', e);
				});
			} else {
				readData[setting].state = false; // Disable the setting thing

				const formatBool = (elem) => elem ? 'Enabled' : 'Disabled';
				const embed = new Discord.MessageEmbed()
					.setColor(tofuGreen)
					.setDescription(`\`${formatBool(readData[setting].state)}\` ${readData[setting].humanizedString} settings`)
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
				.setDescription(`${readData[setting].humanizedString} settings are currently \`${formatBool(readData[setting].state)}\`.`);

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
