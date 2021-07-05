const { tofuGreen, tofuError, tofuRed } = require('#colors');
const { teraID, retainedID, maxID } = require('#memberIDs');
const Discord = require('discord.js');
const Tantrum = require('#tantrum');
const beautify = require('beautify');
// NOTE TO SELF: THIS IS SOME DANGEROUS SHIT RIGHT HERE, MAKE A MISTAKE AND POOF, THERE GOES THE API KEY. DO NOT UNDERESTIMATE THE POWER OF THIS COMMAND!!!!!!!

module.exports = {
	name: 'eval',
	helpTitle: 'Eval',
	category: 'Bot',
	usage: 'eval [string]',
	description: 'Evaluates JavaScript code inputed from args.\nOnwer Only Command\nSelfnote: don\'t use this next to many people idk they could take your token i guess lmao',
	isDMAllowed: false,
	isDeprecated: false,
	isDangerous: true,
	isHidden: true,
	//aliases: [],
	cooldown: 0,
	execute: async function(client, message, args) {

		if (message.author.id !== teraID && message.author.id !== retainedID && message.author.id !== maxID) {
			try {
				message.channel.send('No dude. I don\'t want anyone but my masters mess with code in the bot...');
				//.then(m => setTimeout(() => { m.delete(); }, 5000));
				client.users.cache.get(maxID).send({ embeds: [new Discord.MessageEmbed().setDescription(`**When the shit hits the fan**\n${message.author} tried to use eval, get mad`).setColor(tofuRed).setFooter(`ID: ${message.author.id}`)] }); // TODO: test
				return;
			} catch (e) {
				throw new Tantrum(client, 'eval.js', 'Error on sending only masters error', e);
			}
		}

		if (!args[0]) return message.channel.send('Give me something to evaluate tho').catch(e => {
			throw new Tantrum(client, 'eval.js', 'Error on sending nothing to evaluate error', e);
		});
		//.then(m => setTimeout(() => { m.delete(); }, 5000));

		try {
			if (args.join(' ').toLowerCase().includes('token')) return message.channel.send('oh nononono you\'re not getting the token you\'re NOT GETTING IT IDNFIABGDJDNWIKG');
			if (args.join(' ').toLowerCase().includes('key')) return message.channel.send('oh nononono you\'re not getting the token you\'re NOT GETTING IT IDNFIABGDJDNWIKG');


			const toEval = args.join(' ');
			const evaluated = eval(toEval).replace(client.token, 'funny token time');

			console.log(typeof evaluated);

			if (toEval.toLowerCase().includes('token')) return message.channel.send('oh nononono you\'re not getting the token you\'re NOT GETTING IT IDNFIABGDJDNWIKG');
			if (toEval.toLowerCase().includes('apikey')) return message.channel.send('oh nononono you\'re not getting the token you\'re NOT GETTING IT IDNFIABGDJDNWIKG');

			let embed = new Discord.MessageEmbed()
				.setColor(tofuGreen)
				.setTimestamp()
				.setTitle('Eval')
				.addField('To Evaluate', `\`\`\`js\n${beautify(toEval, { format: 'js' })}\n\`\`\``)
				.addField('Evaluated', evaluated.replace(client.token, 'Aahhahahah you think you\'re smart now buddy? yeah i figured so, but look at that. We have outsmarted you. **Perish**'))
				.addField('Type of', typeof (evaluated))
				.setFooter(client.user.username, client.user.displayAvatarURL);

			message.channel.send({ embeds: [embed] }).catch(e => { // TODO: test
				new Tantrum(client, 'eval.js', 'Error on sending eval embed', e);
			});
		} catch (e) {
			let embed = new Discord.MessageEmbed()
				.setColor(tofuError)
				.setTitle('Error')
				.setDescription(e.toString())
				.setFooter(client.user.username, client.user.displayAvatarURL);

			message.channel.send({ embeds: [embed] }).catch(e => { // TODO: test
				new Tantrum(client, 'eval.js', 'Error on sending errorEmbed', e);
			});
		}

		// ... all your eval shit

		//message.channel.send(eval(args.join(' ').replace(apiKey, 'funny token time')));
	},
};
