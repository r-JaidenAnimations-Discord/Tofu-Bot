const { tofuRed, tofuGreen } = require('#colors');
const Discord = require('discord.js');
const Tantrum = require('#tantrum');
const { promptMessage } = require('#utils/promptMessage.js');

module.exports = {
	name: 'report',
	helpTitle: 'Report',
	category: 'Bot',
	usage: 'report [problem]',
	description: 'Report bugs or other issues on Tofu.\nImproper use is punishable!',
	isDMAllowed: true,
	isDeprecated: false,
	isDangerous: false,
	isHidden: false,
	aliases: ['issue', 'bug', 'bugreport'],
	cooldown: 5,
	execute: async function(client, message, args) {
		const { bugReportChannelID } = client.config;

		if (!args[0]) return message.channel.send(`You gotta describe the problem ${message.author.username.toLowerCase()}. That's right, your name doesn't deserve to be capitalized you vertical coathanger.`).catch(e => {
			throw new Tantrum(client, 'report.js', 'Error on sending \'no problem given\' message');
		});
		const warnEmbed = new Discord.MessageEmbed()
			.setColor(tofuRed)
			//.setAuthor(message.author.tag, message.member.user.displayAvatarURL({ format: 'png', size: 4096, dynamic: true }))
			.setTitle('HOLD UP')
			.setDescription('Posting useless things or trolls is a punishable offense. If you are planning on trolling, dismiss right now. Otherwise, confirm below.')
			.setFooter('This is also a good moment to check your report before posting just in case you missed something.')
			.setTimestamp();

		return message.channel.send({ embeds: [warnEmbed] }).then(async msg => { // TODO: test
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
					client.channels.cache.get({ embeds: [bugReportChannelID] }).send(reportEmbed); // TODO: test
					message.channel.send('Your report was posted sucessfully, thank you.\nWe may contact you for more information.');
				} catch (e) {
					try {
						message.channel.send('Sorry, something went wrong while processing your request please try again later and contact Maxim');
						new Tantrum(client, 'report.js', 'Error on posting error report', e);
					} catch (e) {
						throw new Tantrum(client, 'report.js', 'Error on notifying user of error', e);
					}
				}
			} else if (emoji === '❌') {
				msg.delete();
			}
		}).catch(e => {
			throw new Tantrum(client, 'report.js', 'Error on sending bug report', e);
		});
	},
};
