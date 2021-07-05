const { tofuGreen } = require('#colors');
const Discord = require('discord.js');
const Tantrum = require('#tantrum');
const { promptMessage } = require('#utils/promptMessage.js');
const { trivia } = require('#commandData/jaidenTriviaList.js');

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
	isDMAllowed: false,
	isDeprecated: false,
	isDangerous: false,
	isHidden: false,
	aliases: ['jaidentrivia', 'jtrivia'],
	cooldown: 30,
	execute: async function(client, message, args) {

		if (args[0] === 'rules') {
			//return message.channel.send('Rules and info will be put here');
			const ruleEmbed = new Discord.MessageEmbed()
				.setTitle('Trivia Info')
				.setDescription('A question gets presented, users can click the reaction corresponding to the answer they think is correct.\n \nAfter 15s, a ✅ reaction appears, the original starter of the trivia can react to highlight the answer.\n \nAfter 1m, the correct answer is automatically highlighted.')
				.setColor(tofuGreen);

			return message.channel.send({ embeds: [ruleEmbed] }).catch(e => {
				throw new Tantrum(client, 'trivia.js', 'Error on sending ruleEmbed', e);
			});
		}

		//message.channel.send('hotel? Trivia!');
		let q = trivia[Math.floor(Math.random() * trivia.length)];
		let i = 0;
		let correctedEmbed = new Discord.MessageEmbed()
			.setTitle(q.question)
			// .setDescription(
			// 	q.answers.map((answer, i) =>
			// 		`${i === q.correct ? '✅ **' : '❌ '}${numberReactions.get(i + 1)}: ${answer}${i === q.correct ? '**' : ''}\n`
			// 	)
			// )
			.setColor(tofuGreen)
			.setFooter(`The correct answer has been marked.`);

		let embedDescription = q.answers.map((opt) => {
			i++;
			return `${numberReactions.get(i)}: ${opt}\n`;
		})
		const Embed = new Discord.MessageEmbed()
			.setTitle(q.question)
			// .setDescription(
			// 	// q.answers.map((opt) => {
			// 	// 	i++;
			// 	// 	return `${numberReactions.get(i)}: ${opt}\n`;
			// 	// })

			// 	q.answers.map((opt, i) => `${numberReactions.get(i)}: ${opt}`).join('\n')
			// )
			.setColor(tofuGreen)
			.setFooter(`${message.member.displayName} can reveal the answer in 15s when the ✅ appears. Or wait 1m.`);

		message.channel.send({ embdes: [Embed] }).then(async sentEmbed => { // TODO: test
			let count;
			for (count = 0; count < q.answers.length; count++) {
				//console.log(`${numberReactions.get(count + 1)}`);
				try {
					await sentEmbed.react(`${numberReactions.get(count + 1)}`);
				} catch (e) {
					throw new Tantrum(client, 'trivia.js', 'Error on reacting to embed', e);
				}
			}
			setTimeout(async () => {
				//sentEmbed.react('✅');
				const correct = await promptMessage(sentEmbed, message.author, 45, '✅'); // TODO: test

				if (correct === '✅') {
					//message.channel.send('YAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAS');
					correctedEmbed.setFooter(`${message.member.displayName} revealed the answer.`);
					sentEmbed.edit({ embeds: [correctedEmbed] }).catch(e => { // TODO: Embedify and test????
						throw new Tantrum(client, 'trivia.js', 'Error on editing message to correctedEmbed', e);
					});
				}
				else {
					//message.channel.send('k')
					correctedEmbed.setFooter(`1 minute passed, the answer has been revealed.`);
					sentEmbed.edit({ embeds: [correctedEmbed] }).catch(e => { // TODO: Embedify and test ????
						throw new Tantrum(client, 'trivia.js', 'Error on editing message to correctedEmbed', e);
					});
				}
			}, 15000);
		}).catch(e => {
			throw new Tantrum(client, 'trivia.js', 'Error on sending mainEmbed', e);
		});
	},
};
