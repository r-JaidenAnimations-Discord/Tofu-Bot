const Discord = require('discord.js');
const { botProfile, tofuBlue, generalChannelId, rulesChannelID } = require('../config.json');
const { handleError } = require('./errorHandler.js');
//const { welcomes, byes } = require('../commanddata/greetingList.js');

let heyEnable = false;

// Enable or disable the randomised status
const toggleHeyEnable = (client, message, args) => {
	//heyEnable = !heyEnable

	console.log(args);
	console.log(args[0]);
	if (!args[0]) {
		const heyaState = new Discord.MessageEmbed()
			.setColor(tofuBlue)
			.setAuthor('Tofu Bot', botProfile)
			.setDescription(`Welcome messages: \`${heyEnable}\` (unchanged)`)
			.setTimestamp()
			.setFooter('Made with love');

		try {
			return message.channel.send(heyaState);
		} catch (e) {
			return handleError(client, 'welcomeMsg.js', 'Error on sending the heyaState embed', e);
		}
	}
	else if (args[0] == 'enable') {
		heyEnable = true;
	}
	else if (args[0] == 'disable') {
		heyEnable = false;
	}
	else {
		try {
			return message.channel.send(`\`${args[0]}\` is not a valid argument. Allowed arguments are \`enable\` and \`disable\``);
		} catch (e) {
			
			return handleError(client, 'welcomeMsg.js', 'Error on sending the invalid argument message', e);
		}
	}
	
	const heyaEmbed = new Discord.MessageEmbed()
		.setColor(tofuBlue)
		.setAuthor('Tofu Bot', botProfile)
		.setDescription(`Welcome messages have been set to: \`${heyEnable}\``)
		.setTimestamp()
		.setFooter('Made with love');

	try {
		message.channel.send(heyaEmbed);
		console.log(`Heya cya set to: ${heyEnable}`);
	} catch (e) {
		return handleError(client, 'welcomeMsg.js', 'Error on sending heyaEmbed', e);
	}
}

const usrLeft = async (client, member) => {
	// tried it in a separate file, didn't work, this is my botch
	const byes = [
		`Welps, guess like **${member.displayName}** couldn't stand to be around us, adiós.`,
		`**${member.displayName}** is hanging up now, bye.`
	
	];

	console.log(heyEnable);
	if (heyEnable === false) return;
	try {
		let randomBye = byes[Math.floor(Math.random() * byes.length)];
		client.channels.cache.get(generalChannelId).send(randomBye);
		return;
	} catch(e) {
		return handleError(client, 'welcomeMsg.js', 'Error on sending cya message', e);
	}
}

const usrJoin = async (client, member) => {
	// tried it in a separate file, didn't work, this is my botch
	const welcomes = [
		`<@${member.id}> burst through the window for welcome!`,
		`Hello, <@${member.id}>. Welcome to r/JaidenAnimations!`,
		`Hello, <@${member.id}>, still waiting for plont...`,
		`Hello <@${member.id}> grab a cup o' water and talk with us`
	];

	console.log(heyEnable);
	if (heyEnable === false) return;
	try {
		let randomWelc = welcomes[Math.floor(Math.random() * welcomes.length)];
		client.channels.cache.get(generalChannelId).send(`${randomWelc}\nPlease make sure to read <#${rulesChannelID}> and the pinned comments / topics for this and other channels.\nAnd for the context, Jaiden isn't here :p`);
		return;
	} catch(e) {
		return handleError(client, 'welcomeMsg.js', 'Error on sending welcome message', e);
	}
}
   
module.exports = {
	toggleHeyEnable,
	usrJoin,
	usrLeft,
	heyEnable
};
