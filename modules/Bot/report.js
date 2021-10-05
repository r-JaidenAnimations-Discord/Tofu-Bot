const { tofuBlue } = require('#colors');
const { maxID } = require('#memberIDs');
const Discord = require('discord.js');
const Tantrum = require('#tantrum');

module.exports = {
	name: 'report',
	helpTitle: 'Report',
	category: 'Bot',
	usage: 'report',
	description: 'Report bugs or other issues on Tofu.\nImproper use is punishable!',
	isDMAllowed: false,
	isDangerous: false,
	mainServerOnly: false,
	isHidden: false,
	aliases: ['issue', 'bug', 'bugreport'],
	cooldown: 5,
	execute: async function(client, message, args) {
		const embed = new Discord.MessageEmbed()
			.setColor(tofuBlue)
			.setTitle('Reporting has moved!')
			.setDescription(`Tofu bug reporting has moved to GitHub\n[Click here to open the issues page](https://github.com/r-JaidenAnimations-Discord/Tofu-Bot/issues)\nAlternatively, you can DM <@${maxID}>`)
			.setTimestamp();

		return message.channel.send({ embeds: [embed] }).catch(e => {
			throw new Tantrum(client, 'report.js', 'Error on sending report embed', e);
		});
	},
};
