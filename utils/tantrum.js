// Yes, I could just console log it, but I could also poke
// myself in the eye with a sharp stick. Either way you wouldn't
// be able to see what's going on.

// Don't listen to Max, he has been in torture for the past months using this system to
// listen to every single error possible instead of just the really important ones
// (API errors, ) thats literally it
// INSTEAD I'll refactor this Tantrum code and bind it to process errors so it'll
// be more generic and less "something().catch(e => lol(e))"
const { tofuError } = require('#colors');
const { maxID } = require('#memberIDs');
const { MessageEmbed } = require('discord.js');
const chalk = require('chalk');

class Tantrum extends Error {
	/**
	 * Handles errors by DM notifying and console logging
	 * @param {Client} client Discord client
	 * @param {String|Error} err Error output
	 */
	constructor(client, err) {
		super(`${chalk.redBright('[Error]')}: ${err?.stack}`);
		this.client = client;
		this.err = err;
		this.handle();
	}
	handle() {
		// THIS GUY PUT AN ERROR HANDLER FOR HIS ERROR HANDLER NO FUCKING WAY
		// - tera
		console.error(`${chalk.redBright('[Error]')}: ${this.err}`);
		return this.client.users.cache.get(maxID).send({ embeds: [new MessageEmbed().setDescription(`WAAAH\n\`\`${this.err}\`\``).setColor(tofuError)] })
			.catch(__ => { });
	}
}

module.exports = Tantrum;
