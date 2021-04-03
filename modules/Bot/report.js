const Discord = require('discord.js');
const { tofuRed, tofuGreen, bugReportChannelID } = require('../../config.json');
const { promptMessage } = require('../../functions/promptMessage.js');
const { handleError } = require('../../functions/errorHandler.js');

module.exports = {
	name: 'report',
	helpTitle: 'Report',
	category: 'Bot',
	usage: 'report [problem]',
	description: 'Report bugs or other issues on Tofu.\n Improper use is punishable!',
	isDMAllowed: true,
	isDeprecated: false,
	aliases: ['issue', 'bug', 'bugreport'],
	cooldown: 5,
	execute: async function(client, message, args) {
		if (!args[0]) {
			try {
				return message.channel.send(`You gotta describe the problem ${message.author.username.toLowerCase()}. That's right, your name doesn't deserve to be capitalized you shrimp's head.`)
			} catch (e) {
				return handleError(client, 'report.js', 'Error on sending \'no problem given\' message');
			}
		}
		const warnEmbed = new Discord.MessageEmbed()
			.setColor(tofuRed)
			//.setAuthor(message.author.tag, message.member.user.displayAvatarURL({ format: 'png', size: 4096, dynamic: true }))
			.setTitle('HOLD UP')
			.setDescription('Posting useless things or trolls is a punishable offense. If you are planning on trolling, dismiss right now. Otherwise, confirm below.')
			.setTimestamp();

		return message.channel.send(warnEmbed).then(async msg => {
			const emoji = await promptMessage(msg, message.author, 30, ['✅', '❌']);

			if (emoji === '✅') {
				const reportEmbed = new Discord.MessageEmbed()
					.setColor(tofuGreen)
					.setTitle(`Report by ${message.author.username}`)
					.setDescription(args.slice(0).join(' '))
					.setFooter(`ID: ${message.author.id}`)
					.setTimestamp();

				msg.delete();
				try {
					client.channels.cache.get(bugReportChannelID).send(reportEmbed);
					message.channel.send('Your report was posted sucessfully');
				} catch (e) {
					try {
						message.channel.send('Sorry, something went wrong while processing your request please try again later and contact Maxim');
						handleError(client, 'report.js', 'Error on posting error report', e);
					} catch (e) {
						return handleError(client, 'report.js', 'Error on notifying user of error', e);
					}
				}
			} else if (emoji === '❌') {
				msg.delete();
			}
		});
	},
};