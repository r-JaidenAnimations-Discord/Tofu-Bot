const Discord = require('discord.js');
const { prefix, botProfile, tofuBlue } = require('../config.json');
const { handleError } = require('./errorHandler.js');

let randomStatusEnable = true;

// Set the bot's status
const setSts = (client, message, selectedStatus) => {
	switch (/*this.*/selectedStatus) { // lmao, i fucking hate this.
		case 'awake':
			client.user.setPresence({
				status: 'online',
				activity: {
					name: 'you',
					type: 'WATCHING'
				}
			});
			break;
		case 'asleep':
			client.user.setPresence({
				status: 'idle',
				activity: {
					name: 'you but half asleep',
					type: 'WATCHING'
				}
			});
			break;
		case 'busy':
			client.user.setPresence({
				status: 'dnd',
				activity: {
					name: 'you but in a meeting',
					type: 'WATCHING'
				}
			});
			break;
		case 'gone':
			client.user.setPresence({
				status: 'invisible',
				activity: {
					name: 'or am i?',
					type: 'WATCHING'
				}
			});
			break;
		case 'stream':
			client.user.setPresence({
				status: 'online',
				activity: {
					name: 'something',
					type: 'STREAMING',
					url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
				}
			});
			break;
		case 'play':
			client.user.setPresence({
				status: 'online',
				activity: {
					name: 'with Ari Bot',
					type: 'PLAYING'
				}
			});
			break;
		case 'listen':
			client.user.setPresence({
				status: 'online',
				activity: {
					name: 'Grady\'s Playlist',
					type: 'LISTENING'
				}
			});
			break;
		case 'next':
			const nextState = states[Math.floor(Math.random() * states.length)];
			setSts(client, message, nextState);
			break;
		case 'random':
				const args = message.content.slice(prefix.length).trim().split(/ +/g);
				if (!args[2]) {
					const randomStatusState = new Discord.MessageEmbed()
						.setColor(tofuBlue)
						.setAuthor('Tofu Bot', botProfile)
						.setDescription(`Random statusses: \`${randomStatusEnable}\`. (not modified)`)
						.setTimestamp()
						.setFooter('Made with love');

					try {
						return message.channel.send(randomStatusState);
					} catch (e) {
						return handleError(client, 'statusFunction.js', 'Error on sending randomStatusState embed', e);
					}
				}
				else {
					toggleRandomStatus(client, message, args);
				}
			break;
		default:
			try {
				return message.channel.send('Invalid argument given');
			} catch (e) {
				return handleError(client, 'statusFunction.js', 'Error on sending invalid status argument message', e);
			}
		}
	}

// Enable or disable the randomised status
const toggleRandomStatus = (client, message, args) => {
	//randomStatusEnable = !randomStatusEnable
	//randomStatus(client);

	if (args[2] == 'enable') {
		randomStatusEnable = true;
	}
	else if (args[2] == 'disable') {
		randomStatusEnable = false;
	}
	else {
		try {
			return message.channel.send(`\`${args[2]}\` is not a valid argument. Allowed arguments are \`enable\` and \`disable\``);
		} catch (e) {
			return handleError(client, 'statusFunction.js', 'Error on sending invalid random status argument message', e);
		}
	}
	
	const randomStatusEmbed = new Discord.MessageEmbed()
		.setColor(tofuBlue)
		.setAuthor('Tofu Bot', botProfile)
		.setDescription(`Automatic randomised messages have been set to: \`${randomStatusEnable}\``)
		.setTimestamp()
		.setFooter('Made with love');

	try {
		message.channel.send(randomStatusEmbed);
		console.log(`Randomoooo set to: ${randomStatusEnable}`);
		return;
	} catch (e) {
		return handleError(client, 'statusFunction.js', 'Error on sending randomStatusEmbed', e);
	}
}

// We don't want to have the bot appear offline
const states = ['awake', 'asleep', 'busy', /*'gone', */'stream', 'play', 'listen'];
const randomStatus = (client, message) => { 
  if (randomStatusEnable) {
	//console.log({randomStatusEnable});
	const nextState = states[Math.floor(Math.random() * states.length)];
	setSts(client, message, nextState);
	
  }
  else {
	//console.log({randomStatusEnable});
  }
}
   
module.exports = {
	setSts,
	randomStatus
};