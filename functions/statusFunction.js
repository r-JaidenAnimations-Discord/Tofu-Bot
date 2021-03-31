//const Discord = require('discord.js');
const fs = require('fs');
const { /*prefix, botProfile, tofuBlue, */jaidenServerID, level20RoleID } = require('../config.json');
const { handleError } = require('./errorHandler.js');

let randomStatusEnable = true;

// Set the bot's status
const setSts = (client, message, selectedStatus) => {
	let youOrJaiden = Math.random() < 0.5 ? 'you' : 'Jaiden';
	switch (/*this.*/selectedStatus) { // lmao, i fucking hate this.
		case 'awake':
			client.user.setPresence({
				status: 'online',
				activity: {
					name: youOrJaiden,
					type: 'WATCHING'
				}
			});
			break;
		case 'asleep':
			client.user.setPresence({
				status: 'idle',
				activity: {
					name: `${youOrJaiden} but half asleep`,
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
				/*const args = message.content.slice(prefix.length).trim().split(/ +/g);
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
				}*/
				message.channel.send('This command has been moved, use the `settings` command to enable or disable the random status setting');
			break;
		case 'randomuser':
			//This is where more stuff will eventually happen
			/*t+eval var getMap =  message.guild.roles.cache.get('774872082290704394').members.map(m=>m.user.tag);
var getArray = Array.from(getMap)
message.channel.send(getArray[Math.floor(Math.random() * getArray.length)]);*/
			//this mess works and returns a random user with the right role, i'll figure out the rest later

			//better and fetches actual username
			/*t+eval let memberMap = message.guild.roles.cache.get('774872082290704394').members.map(m=>m.user.id);
			let memberArr = Array.from(memberMap);
			let randomMemberID = memberArr[Math.floor(Math.random() * memberArr.length)];
			let selectedDisplayName = client.guilds.cache.get('754451472699228281').members.cache.get(randomMemberID).displayName;
			message.channel.send(selectedDisplayName)*/
			
			//This works, but it's also called spaghetticode apparently
			/*let memberMap = message.guild.roles.cache.get(level20RoleID).members.map(m=>m.user.id);
			let memberArr = Array.from(memberMap);
			let randomMemberID = memberArr[Math.floor(Math.random() * memberArr.length)];
			let selectedDisplayName = client.guilds.cache.get(jaidenServerID).members.cache.get(randomMemberID).displayName;*/

			let memberList = client.guilds.cache.get(jaidenServerID).roles.cache.get(level20RoleID).members.map(m => m.displayName);
			let randomMember = memberList[Math.floor(Math.random() * memberList.length)]

			client.user.setPresence({
				activity: {
					name: randomMember,
					type: 'WATCHING'
				}
			});

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
/*const toggleRandomStatus = (client, message, args) => {
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
}*/

// We don't want to have the bot appear offline
const states = ['awake', 'asleep', 'busy', /*'gone', */'stream', 'play', 'listen', 'randomuser'];
const randomStatus = async (client, message) => {
	// Fetch the settings JSON file and pull it's randomStatus string
	const data = await fs.readFileSync('./commanddata/Configuration/settings.json', 'utf-8');
	var settingsFile = JSON.parse(data);

  /*if (randomStatusEnable) {
	//console.log({randomStatusEnable});
	const nextState = states[Math.floor(Math.random() * states.length)];
	setSts(client, message, nextState);
	
  }
  else {
	//console.log({randomStatusEnable});
  }*/
  	if (settingsFile.randomStatus === true) {
		const nextState = states[Math.floor(Math.random() * states.length)];
		setSts(client, message, nextState);
		//console.log('[RAND] Enabled, set');
	}
	/*else {
		console.log('[RAND] Disabled');
	}*/
}

module.exports = {
	setSts,
	randomStatus
};
