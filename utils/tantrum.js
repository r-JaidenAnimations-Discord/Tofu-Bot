const { tofuError } = require('#colors');
const { maxID } = require('#memberIDs');
const Discord = require('discord.js');
const chalk = require('chalk');

class Tantrum {
	/**
	 * Handles errors by DM notifying and console logging
	 * @param {Client} client Discord client
	 * @param {String} file File name
	 * @param {String} message Error message
	 * @param {String} err Error output
	 */
	constructor(client, file, message, err) {
		this.client = client;
		this.file = file;
		this.message = message;
		this.err = err;
		this.handle();
	}
	handle() {
		try {
			console.log(`${chalk.yellow('[ERROR]')}: ${this.file}: ${this.message}: ${this.err}`);
			// How did i even write this without having a freaking aneurysm
			return this.client.users.cache.get(maxID).send(new Discord.MessageEmbed().setDescription(`WAAAH: ${this.file}: ${this.message} \n\`\`${this.err}\`\``).setColor(tofuError));
		} catch (f) {
			throw new Error(`Sending error DM ${chalk.redBright('failed')}! DMError: ${f}`);

		}
	}
}

module.exports = Tantrum
