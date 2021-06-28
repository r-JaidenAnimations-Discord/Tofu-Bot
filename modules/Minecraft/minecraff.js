const { tofuGreen, tofuError } = require('#colors');
const Discord = require('discord.js');
const https = require('https');
const fs = require('fs');
const Tantrum = require('#tantrum');

module.exports = {
	name: 'minecraft',
	helpTitle: 'Minecraft',
	category: 'Minecraft',
	usage: 'minecraft',
	description: 'Show info about our minecraft server!',
	isDMAllowed: false,
	isDeprecated: false,
	isDangerous: false,
	isHidden: false,
	aliases: ['mc', 'minecraff', 'minecrap'],
	cooldown: 5,
	execute: async function(client, message, args) {
		const { minecraftIP } = client.config;

		message.channel.startTyping();

		// Load the settings file
		const data = await fs.readFileSync('./deployData/settings.json', 'utf-8');
		var settingsFile = JSON.parse(data);

		// API endpoint
		var url = `https://api.mcsrvstat.us/2/${minecraftIP}`;

		var downStatus = null;

		const attachment = new Discord.MessageAttachment('./commanddata/minecraff.png', 'minecraff.png');
		const minecraftEmbed = new Discord.MessageEmbed()
			.setColor(tofuGreen)
			.attachFiles(attachment)
			.setTitle('Jaiden Animations Minecraft Server')
			.setThumbnail('attachment://minecraff.png')
			.addField('IP Address:', minecraftIP)
			.setTimestamp();

		// Set the status to maintenance in case of maintenance
		if (settingsFile.minecraftMaintenance === true) {
			downStatus = '🛠️ **The server is currently undergoing maintenance.**';
			minecraftEmbed.addField('Server status:', downStatus);
			message.channel.stopTyping();
			message.channel.send(minecraftEmbed);
			return;
		}

		https.get(url, function(res) {
			var body = '';

			res.on('data', function(chunk) {
				body += chunk;
			});

			res.on('close', () => {
				var APIresponse = JSON.parse(body);
				console.log('Got a response: ', APIresponse.ip);
				var i;
				var playerList = 'Sadly, no online members';
				var userCount = 0;
				downStatus = `${APIresponse.online === true ? 'The server is currently working' : '⚠️ **The server is down**'}`

				if (APIresponse.online === true) {
					minecraftEmbed.addField('Version:', APIresponse.version)
				}

				if (APIresponse.online === true) {
					if (APIresponse.players.online) {
						if (APIresponse.players.list) {
							playerList = '';
							for (i = 0; i < APIresponse.players.list.length; i++) {
								playerList += APIresponse.players.list[i] + '\n';
							}
						}
					}
				}

				if (APIresponse.online === true) {
					userCount = `${APIresponse.players.online}/${APIresponse.players.max}`;
					minecraftEmbed.addField(`Online Users: ${userCount}`, playerList);
				}

				minecraftEmbed.addField('Server status:', downStatus);

				try {
					message.channel.stopTyping();
					message.channel.send(minecraftEmbed);
				} catch (e) {
					console.log(`kek ${e}`);
				}

			});
			/*res.on('end', function() {
				// prob going to remove this
				console.log('Request finished');
			});*/
		}).on('error', function(e) {
			try {
				message.channel.stopTyping();
				message.channel.send(new Discord.MessageEmbed().setDescription(`So uh the API doesn't wanna talk rn`).setColor(tofuError));
				new Tantrum(client, 'minecraff.js', 'API did not respond', e);
			} catch (f) {
				new Tantrum(client, 'minecraff.js', 'Error on sending error embed', f);
			}
		});
	},
};
