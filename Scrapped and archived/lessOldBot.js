// When I started writing this, only God and I understood what I was doing
// Now, only God knows
const fs = require('fs');
const Discord = require('discord.js');
const client = new Discord.Client();
const { prefix, apiKey, infonetBlue, infonetGreen, infonetOrange, generalChannelId } = require('./config.json');
const { randomStatus } = require('./functions/statusFunction.js');
//const { badWords } = require('./functions/badWords.js');

//setInterval(randomStatus(client), 5 * 1000); // 30 * 60 * 1000 set to this later (wait idk how recursion would work)

setInterval(function() { randomStatus(client) }, 5 * 1000);

client.commands = new Discord.Collection();
client.cooldowns = new Discord.Collection();

// Shout when ready
/*client.once('ready', async() => {
	console.log(`Alive as ${client.user.tag}`);
	//setSts(client, 'awake'); //just not yet, later
	client.channels.cache.get(generalChannelId).send(`Hello, i am alive now`);
	//client.user.setPresence({
	//	status: 'dnd',
	//	activity: {
	//		name: 'you but in a meeting',
	//		type: 'WATCHING'
	//	}
	//});
	//client.emit('guildMemberAdd', '778341569714585691')
});*/


/*client.on('message', message => {

	badWords(client, message)
	// OwO what's this :3
	if (message.content.toLowerCase() === 'owo') {
		message.channel.send('What\'s this? (´・ω・`)');
	}

	// Bots shall not trigger me
	if (!message.content.startsWith(prefix) || message.author.bot) return;
	// List up all commands
	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const commandName = args.shift().toLowerCase();

	// Include aliases
	const command = client.commands.get(commandName)
		|| client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));	
	
	if (!command) return;
	
	// Is this command enabled?
	if (command.isEnabled === false) {
		return message.reply('This command has been (temporarily) disabled.');
	}

	// Is this command allowed inside DM?
	if (command.guildOnly && message.channel.type === 'dm') {
		return message.reply('I can\'t execute that command inside DMs!');
	}

	//AdminOnly? (todo)

	// Cooldown?
	if (!cooldowns.has(command.name)) {
		cooldowns.set(command.name, new Discord.Collection());
	}
	const now = Date.now();
	const timestamps = cooldowns.get(command.name);
	const cooldownAmount = (command.cooldown || 3) * 1000;
	if (timestamps.has(message.author.id)) {
		const expirationTime = timestamps.get(message.author.id) + cooldownAmount;
		if (now < expirationTime) {
			const timeLeft = (expirationTime - now) / 1000;
			return message.reply(`please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`);
		}
	}
	timestamps.set(message.author.id, now);
	setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

	// All requirements are met, try running the command
	try {
		command.execute(client, message, args);
	} catch (error) {
		console.error(error);
		message.reply('Sooo i like um broke');
	}
});*/


//////client.on('guildMemberAdd', member => {
//////	client.channels.cache.get(generalChannelId).send(`Hi <@${member}>. Welcome to the Infonet Team discord server!`);
//////	//client.channels.cache.get(generalChannelId).send(`Hi <@${member.id}>. Welcome to the Infonet Team discord server!`);
//////});
//////
//////client.on('guildMemberRemove', member => {
//////	client.channels.cache.get(generalChannelId).send(`Yeetus yeetus **${member.displayName}** deletus!`); 
//////});
// suddenly broken

/*
client.on('guildBanAdd', member => {
	client.channels.cache.get(generalChannelId).send(`<@${member.id}> was banned`);
});

client.on('guildBanRemove', member => {
	client.channels.cache.get(generalChannelId).send(`<@${member.id}> was unbanned`);
});*/

// Log in
client.login(apiKey);

// Handlers' modules
['commands', 'event'].forEach(handler => { // in event evt.bind is not a function. I DON'T KNOW WHY, soooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo
    require(`./handlers/${handler}`)(client);
});
