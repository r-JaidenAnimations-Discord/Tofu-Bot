// When I started writing this, only God and I understood what I was doing
// Now, only God knows
const Discord = require('discord.js');
const { prefix, apiKey, botVersion, releaseDate, mxmProfile, infonetSvr, botProfile, infonetBlue, infonetGreen, infonetOrange } = require('./config.json');
const client = new Discord.Client();

var randomStatusEnable = true;
setInterval(randomStatus, 10 * 1000); // 30 * 60 * 1000 set to this later

client.once('ready', () => {
	console.log('Ready!');
	//client.user.setActivity('you', {type:'WATCHING'});
	setStatus('awake');
});

client.on('message', message => {

	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const command = args.shift().toLowerCase();
	
	if (command === 'wake') {
		setStatus('awake');
	}
	else if (command === 'sleep') {
		setStatus('asleep');
	}
	else if (command === 'busy') {
		setStatus('busy');
	}
	else if (command === 'hide') {
		setStatus('gone');
	}
	else if (command === 'stream') {
		setStatus('stream');
	}
	else if (command === 'play') {
		setStatus('play');
	}
	else if (command === 'listen') {
		setStatus('listen');
	}
	else if (command === 'randomstatus') {
		if (randomStatusEnable === true) {
			randomStatusEnable = false;
			const randomStatusEmbed = new Discord.MessageEmbed()
			.setColor('#0099ff')
			.setAuthor('Infonet Bot', botProfile)
			.setDescription(`Automatic randomised messages have been set to: ${randomStatusEnable}`)
			.setTimestamp()
			.setFooter('Made by Maxim Coppieters', mxmProfile);
			message.channel.send(randomStatusEmbed);
		}
		else {
			randomStatusEnable = true;
			const randomStatusEmbed = new Discord.MessageEmbed()
			.setColor('#0099ff')
			.setAuthor('Infonet Bot', botProfile)
			.setDescription(`Automatic randomised messages have been set to: ${randomStatusEnable}`)
			.setTimestamp()
			.setFooter('Made by Maxim Coppieters', mxmProfile);
			message.channel.send(randomStatusEmbed);
		}
	}
});

client.login(apiKey);

/*client.on('guildMemberAdd', member => {
	client.channels.cache.get('593140624669016068').send(`Hello, <@${member.id}>. Welcome to the Infonet Team discord server!`);
});*/

// Create an event listener for new guild members
client.on('guildMemberAdd', member => {
	console.log('hello there')
	// Send the message to a designated channel on a server:
	const channel = member.guild.channels.cache.find(ch => ch.name === 'general');
	// Do nothing if the channel wasn't found on this server
	if (!channel) return;
	// Send the message, mentioning the member
	channel.send(`Welcome to the server, ${member}`);
  });


client.on('guildMemberRemove', member => {
	client.channels.cache.get('593140624669016068').send(`Yeetus yeetus **${member.displayName}** deletus!`); 
});

function randomStatus() {
	if (randomStatusEnable === true ) {
		const statusses = ['awake', 'asleep', 'busy', /*'gone', */'stream', 'play', 'listen']; //We don't want to have the bot appear offline
		var randomisedStatus = statusses[Math.floor(Math.random() * statusses.length)];
		setStatus(randomisedStatus);
	}
	else {
		// If randomisation is off, just don't do it :]
	}
}
// Status functions
function setStatus(selectedStatus) {
	//console.log(selectedStatus)
	if (selectedStatus === 'awake') {
		client.user.setPresence({
			status: 'online',
			activity: {
				name: 'you',
				type: 'WATCHING'
			}
		})
	}
	else if (selectedStatus === 'asleep') {
		client.user.setPresence({
			status: 'idle',
			activity: {
				name: 'you but half asleep',
				type: 'WATCHING'
			}
		})
	}
	else if (selectedStatus === 'busy') {
		client.user.setPresence({
			status: 'dnd',
			activity: {
				name: 'you but in a meeting',
				type: 'WATCHING'
			}
		})
	}
	else if (selectedStatus === 'gone') {
		client.user.setPresence({
			status: 'invisible',
			activity: {
				name: 'or am i?',
				type: 'WATCHING'
			}
		})
	}
	else if (selectedStatus === 'stream') {
		client.user.setPresence({
			status: 'online',
			activity: {
				name: 'something',
				type: 'STREAMING',
				url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
			}
		})
	}
	else if (selectedStatus === 'play') {
		client.user.setPresence({
			status: 'online',
			activity: {
				name: 'you like a piano',
				type: 'PLAYING'
			}
		})
	}
	else if (selectedStatus === 'listen') {
		client.user.setPresence({
			status: 'online',
			activity: {
				name: 'you',
				type: 'LISTENING'
			}
		})
	}
	else {
		console.error('If you thought you were screwed before, boy do I have news for you!');
	}
}