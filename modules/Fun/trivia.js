const Discord = require('discord.js');
const { tofuGreen } = require('../../config.json');
const { trivia } = require('../../commanddata/jaidenTriviaList.js');
const { promptMessage } = require('../../functions/promptMessage.js');

let numberReactions = new Map([
	[1, '1️⃣'],
	[2, '2️⃣'],
	[3, '3️⃣'],
	[4, '4️⃣'],
	[5, '5️⃣'],
	[6, '6️⃣'],
	[7, '7️⃣'],
	[8, '8️⃣'],
	[9, '9️⃣'],
]);

module.exports = {
	name: 'trivia',
	helpTitle: 'Jaiden Trivia',
	category: 'Fun',
	usage: 'trivia (rules)',
	description: 'Play some trivia.',
	isEnabled: true,
	isDeprecated: false,
	aliases: ['jaidentrivia', 'jtrivia'],
	cooldown: 30,
	execute: async function(client, message, args) {
		if (args[0] == 'rules') {
			//return message.channel.send('Rules and info will be put here');
			const ruleEmbed = new Discord.MessageEmbed()
				.setTitle('Trivia Info')
				.setDescription('A question gets presented, users can click the reaction corresponding to the answer they think is correct.\n \nAfter 15s, a ✅ reaction appears, the original starter of the trivia can react to highlight the answer.\n \nAfter 1m, the correct answer is automatically highlighted.')
				.setColor(tofuGreen);
			
			return message.channel.send(ruleEmbed);    
			}

		//message.channel.send('hotel? Trivia!');
		let q = trivia[Math.floor(Math.random() * trivia.length)];
		let i = 0;
		const correctedEmbed = new Discord.MessageEmbed()
			.setTitle(q.question)
			.setDescription(
				q.answers.map((answer, i) =>
  					`${i === q.correct ? "✅ **" : "❌ "}${numberReactions.get(i + 1)}: ${answer}${i === q.correct ? "**" : ""}\n`
				)
			)
			.setColor(tofuGreen)
			.setFooter(`The correct answer has been marked.`);
		const Embed = new Discord.MessageEmbed()
			.setTitle(q.question)
			.setDescription(
				q.answers.map((opt) => {
				  i++;
				  return `${numberReactions.get(i)}: ${opt}\n`;
				})
			)
			.setColor(tofuGreen)
			.setFooter(`${message.member.displayName} can reveal the answer in 15s when the ✅ appears. Or wait 1m.`);
		message.channel.send(Embed).then(async sentEmbed => {
			let count;
			for (count = 0; count < q.answers.length; count++) {
				//console.log(`${numberReactions.get(count + 1)}`);
			  sentEmbed.react(`${numberReactions.get(count + 1)}`);
			} 
			setTimeout(async() => {
				//sentEmbed.react('✅');
				const correct = await promptMessage(sentEmbed, message.author, 45, ['✅']);
            
				if (correct === '✅') {
					//message.channel.send('YAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAS');
					sentEmbed.edit(correctedEmbed);
				} else {
					//message.channel.send('k')
					sentEmbed.edit(correctedEmbed);
				}
			}, 15000);
		});
	},
};