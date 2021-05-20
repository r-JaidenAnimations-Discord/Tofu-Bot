const Discord = require('discord.js');
const chalk = require('chalk');
//const { maxID, tofuError } = require('../config.json');

class Tantrum {
	constructor(client, file, message, err) {
		this.client = client;
		this.file = file;
		this.message = message;
		this.err = err;
		this.handle();
	}
	handle() {
		try {
			const { maxID, tofuError } = client.config;

			console.log(`${chalk.yellow('[ERROR]')}: ${this.file}: ${this.message}: ${this.err}`);
			// How did i even write this without having a freaking aneurysm
			return this.client.users.cache.get(maxID).send(new Discord.MessageEmbed().setDescription(`WAAAH: ${this.file}: ${this.message} \n\`\`${this.err}\`\``).setColor(tofuError));
		} catch (f) {
			throw new Error(`${chalk.redBright('[FAIL]')}: Sending error DM failed! DMError: ${f}`);

		}
	}
}

module.exports = Tantrum
