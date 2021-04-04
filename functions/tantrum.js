const Discord = require('discord.js');
const { maxID, tofuError } = require('../config.json');
const chalk = require('chalk');

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
            console.log(`${chalk.yellow('[ERROR]')}: ${this.file}: ${this.message}: ${this.err}`);
            return this.client.users.cache.get(maxID).send(new Discord.MessageEmbed().setDescription(`WAAAH: ${this.file}: ${this.message} \n\`\`${this.err}\`\``).setColor(tofuError));
        } catch (f) {
            console.log(`${chalk.redBright('[FAIL]')}: Sending error DM failed! DMError: ${f}`);
            return;
        }
    }
}

module.exports = Tantrum
