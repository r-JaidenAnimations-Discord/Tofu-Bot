const Discord = require('discord.js');
const chalk = require('chalk');
//const { maxID, tofuError } = require('../config.json');

const handleError = (client, file, text, e) => {
	const { maxID, tofuError } = client.config;

	try {
		console.log(`${chalk.yellow('[ERROR]')}: ${file}: ${text}: ${e}`);
		return client.users.cache.get(maxID).send(new Discord.MessageEmbed().setDescription(`BIG OOF: ${file}: ${text} \n\`\`${e}\`\``).setColor(tofuError));
	} catch (f) {
		console.log(`${chalk.redBright('[FAIL]')}: Sending error DM failed! DMError: ${f}`);
		return;
	}
}

module.exports = {
	handleError
};
