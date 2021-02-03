const Discord = require('discord.js');
const { botProfile, tofuBlue, banAli } = require('../config.json');
const { handleError } = require('./errorHandler.js');

let AliTrusted = true;

// Enable or disable the randomised status
const toggleAliTrust = (client, message, args) => {

	if (!args[0]) {
		const AliState = new Discord.MessageEmbed()
			.setColor(tofuBlue)
			.setAuthor('Tofu Bot', botProfile)
			.setDescription(`Ali trust: \`${AliTrusted}\` (unchanged)`)
			.setTimestamp()
			.setFooter('Made without cringe and swear words');

		try {
			return client.users.cache.get(message.author.id).send(AliState);
		} catch (e) {
			return handleError(client, 'aliTrust.js', 'Error on sending AliState embed', e);
		}
	}
	else if (args[0] == 'enable') {
		AliTrusted = true;
	}
	else if (args[0] == 'disable') {
		AliTrusted = false;
	}
	else {
		try {
			return client.users.cache.get(message.author.id).send(`\`${args[0]}\` is not a valid argument. Allowed arguments are \`enable\` and \`disable)\``);
		} catch (e) {
			return handleError(client, 'aliTrust.js', 'Error on sending invalid argument message', e);
		}
	}
	
	const AliEmbed = new Discord.MessageEmbed()
			.setColor(tofuBlue)
			.setAuthor('Tofu Bot', botProfile)
			.setDescription(`Ali trust has been set to: \`${AliTrusted}\``)
			.setTimestamp()
			.setFooter('Made without cringe and swear words');

	try {
		client.users.cache.get(message.author.id).send(AliEmbed);
		console.log(`Ali trust set to: ${AliTrusted}`);
		return;
	} catch (e) {
		return handleError(client, 'aliTrust.js', 'Error on sending AliEmbed', e);
	}
}

const noAli = (client, message, args) => {
	if (AliTrusted === true) {
		return;
	}
	else {
		try {
			return client.users.cache.get(banAli).send('Your very existence causes me intense pain with how unfunny you are.\nNever send a message again.\nNever even fucking conceive a thought again.', { files: ["./commanddata/infinitecringe.png"] });
		} catch (e) {
			return handleError(client, 'aliTrust.js', 'Error on sending nocringe DM', e);
		}
	}
}

module.exports = {
	toggleAliTrust,
	noAli,
	AliTrusted
};
