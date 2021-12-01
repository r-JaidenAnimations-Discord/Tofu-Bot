const { tofuGreen } = require('#colors');
const { maxID, teraID, retainedID } = require('#memberIDs');
const { version, releaseDate } = require('../../package.json');
const Discord = require('discord.js');
const { formatDate } = require('#utils/formatDate.js');

module.exports = {
	name: 'about',
	helpTitle: 'About',
	category: 'Bot',
	usage: 'about',
	description: 'Display the bot\'s information',
	isDMAllowed: false,
	isDangerous: false,
	mainServerOnly: false,
	isHidden: false,
	aliases: ['bot', 'botinfo', 'info'],
	cooldown: 20,
	execute: async function(client, message, args) {
		const { botProfile } = client.config;

		let { heapUsed, heapTotal } = process.memoryUsage();

		// Uptime calculations
		let seconds = Math.floor(process.uptime()); // Math.floor(message.client.uptime / 1000);
		let minutes = Math.floor(seconds / 60);
		let hours = Math.floor(minutes / 60);
		let days = Math.floor(hours / 24);

		seconds %= 60;
		minutes %= 60;
		hours %= 24;

		const aboutEmbed = new Discord.MessageEmbed()
			.setColor(tofuGreen)
			.setAuthor('About Tofu Bot', botProfile)
			.addFields(
				{ name: 'Bot version:', value: version, inline: true },
				{ name: 'Version release date:', value: releaseDate, inline: true },
				{ name: 'Uptime:', value: `${days}d ${hours}h ${minutes}m ${seconds}s`, inline: true },
				{ name: 'Memory Usage:', value: `${(heapUsed / 1024 / 1024).toFixed(1)} MB / ${(heapTotal / 1024 / 1024).toFixed(1)}MB (${(heapUsed / heapTotal * 100).toFixed(2)}%)` },
				{ name: 'Head devs:', value: `<@${maxID}>, <@${teraID}>` },
				{ name: 'Avatar:', value: `<@${retainedID}>` },
				{ name: 'Other acknowledgements', value: '[Available here](https://github.com/r-JaidenAnimations-Discord/Tofu-Bot/blob/master/ACKNOWLEDGEMENTS.md)', inline: true },
				{ name: 'Tofu Bot is now open source!', value: '[GitHub](https://github.com/r-JaidenAnimations-Discord/Tofu-Bot)', inline: true },
				{ name: 'Initial release:', value: formatDate(client.user.createdAt) }
			)
			.setFooter('Made with ☕, without swear words');

		message.channel.send({ embeds: [aboutEmbed] });
	},
};
