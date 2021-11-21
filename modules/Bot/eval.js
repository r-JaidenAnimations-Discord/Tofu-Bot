const { tofuGreen, tofuError, tofuRed } = require('#colors');
const { teraID, retainedID, maxID } = require('#memberIDs');
const Discord = require('discord.js');
const Tantrum = require('#tantrum');
const beautify = require('beautify');
// NOTE TO SELF: THIS IS SOME DANGEROUS $HIT RIGHT HERE, MAKE A MISTAKE AND POOF, THERE GOES THE API KEY. DO NOT UNDERESTIMATE THE POWER OF THIS COMMAND!!!!!!!

module.exports = {
	name: 'evil',
	helpTitle: 'Evil eval',
	category: 'Bot',
	usage: 'evil [string]',
	description: 'Evaluates JavaScript code inputed from args.\nOnwer Only Command\nSelfnote: don\'t use this next to many people idk they could take your token i guess lmao',
	isDMAllowed: false,
	isDangerous: true,
	mainServerOnly: false,
	isHidden: true,
	// aliases: [],
	cooldown: 0,
	execute: async function(client, message, args) {

		if (message.author.id !== teraID && message.author.id !== retainedID && message.author.id !== maxID) {
			try {
				message.channel.send('No dude. I don\'t want anyone but my masters mess with code in the bot...');
				return client.users.cache.get(maxID).send({ embeds: [new Discord.MessageEmbed().setDescription(`**When the sh!t hits the fan**\n${message.author} tried to use eval, get mad`).setColor(tofuRed).setFooter(`ID: ${message.author.id}`)] });
			} catch (e) {
				throw new Tantrum(client, 'eval.js', 'Error on sending only masters error', e);
			}
		}

		if (!args[0]) return message.channel.send('Give me something to evaluate tho').catch(e => {
			throw new Tantrum(client, 'eval.js', 'Error on sending nothing to evaluate error', e);
		});

		try {
			if (args.join(' ').toLowerCase().includes('token')) return message.channel.send('oh nononono you\'re not getting the token you\'re NOT GETTING IT IDNFIABGDJDNWIKG');
			if (args.join(' ').toLowerCase().includes('key')) return message.channel.send('oh nononono you\'re not getting the token you\'re NOT GETTING IT IDNFIABGDJDNWIKG');

			const toEval = args.join(' ');
			let evaluated = eval(toEval);
			evaluated = (evaluated + '').replace(client.token, 'funny token time');

			// console.log(typeof evaluated);

			if (toEval.toLowerCase().includes('token')) return message.channel.send('oh nononono you\'re not getting the token you\'re NOT GETTING IT IDNFIABGDJDNWIKG');
			if (toEval.toLowerCase().includes('apikey')) return message.channel.send('oh nononono you\'re not getting the token you\'re NOT GETTING IT IDNFIABGDJDNWIKG');

			let embed = new Discord.MessageEmbed()
				.setColor(tofuGreen)
				.setTimestamp()
				.setTitle('Eval')
				.addField('To Evaluate', `\`\`\`js\n${beautify(toEval, { format: 'js' })}\n\`\`\``)
				.addField('Evaluated', `${evaluated}`)
				.addField('Type of', typeof (evaluated))
				.setFooter(client.user.username, client.user.displayAvatarURL);

			message.channel.send({ embeds: [embed] }).catch(e => {
				new Tantrum(client, 'eval.js', 'Error on sending eval embed', e);
			});
		} catch (e) {
			const embed = new Discord.MessageEmbed()
				.setColor(tofuError)
				.setTitle('Error')
				.setDescription(e.toString())
				.setFooter(client.user.username, client.user.displayAvatarURL);

			message.channel.send({ embeds: [embed] }).catch(e => {
				new Tantrum(client, 'eval.js', 'Error on sending errorEmbed', e);
			});
		}

		// ... all your eval shit
	},
};
