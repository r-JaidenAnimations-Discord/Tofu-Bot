// Yes, I could just console log it, but I could also poke
// myself in the eye with a sharp stick. Either way you wouldn't
// be able to see what's going on.
const { tofuError } = require('#colors');
const { maxID } = require('#memberIDs');
const Discord = require('discord.js');
const chalk = require('chalk');

class Tantrum extends Error {
	/**
	 * Handles errors by DM notifying and console logging
	 * @param {Client} client Discord client
	 * @param {String} file File name
	 * @param {String} msg Error message
	 * @param {String|Error} err Error output
	 */
	constructor(client, file, msg, err) {
		super(`${chalk.cyan(msg)} in ${chalk.redBright(file)}\n${err?.stack}`);
		this.client = client;
		this.file = file;
		this.msg = msg;
		this.err = err;
		this.handle();
	}
	handle() {
		// How did i even write this without having a freaking aneurysm
		return this.client.users.cache.get(maxID).send({ embeds: [new Discord.MessageEmbed().setDescription(`WAAAH: ${this.file}: ${this.msg} \n\`\`${this.err}\`\``).setColor(tofuError)] }).catch(f => {
			new Error(`Sending error DM ${chalk.redBright('failed')}! DMError: ${f}`);
		});
	}
}

module.exports = Tantrum;
