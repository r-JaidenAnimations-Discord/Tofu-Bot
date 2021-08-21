const { tofuGreen } = require('#colors');
const Discord = require('discord.js');
const Tantrum = require('#tantrum');
const { promptMessage } = require('#utils/promptMessage.js');
const { trivia } = require('#assets/commandTrivia/jaidenTriviaList.js');

const numberReactions = {
	1: '1️⃣',
	2: '2️⃣',
	3: '3️⃣',
	4: '4️⃣',
	5: '5️⃣',
	6: '6️⃣',
	7: '7️⃣',
	8: '8️⃣',
	9: '9️⃣'
};

module.exports = {
	name: 'trivia',
	helpTitle: 'Jaiden Trivia',
	category: 'Fun',
	usage: 'trivia (rules)',
	description: 'Play some trivia.',
	isDMAllowed: false,
	isDeprecated: false,
	isDangerous: false,
	mainServerOnly: false,
	isHidden: false,
	aliases: ['jaidentrivia', 'jtrivia'],
	cooldown: 30,
	execute: async function(client, message, args) {
		// If you think reading this is bad, i had to write it
		if (args[0] === 'rules') {
			// return message.channel.send('Rules and info will be put here');
			const ruleEmbed = new Discord.MessageEmbed()
				.setTitle('Trivia Info')
				.setDescription('A question gets presented, users can click the reaction corresponding to the answer they think is correct.\n \nAfter 15s, a ✅ reaction appears, the original starter of the trivia can react to highlight the answer.\n \nAfter 1m, the correct answer is automatically highlighted.')
				.setColor(tofuGreen);

			return message.channel.send({ embeds: [ruleEmbed] }).catch(e => {
				throw new Tantrum(client, 'trivia.js', 'Error on sending ruleEmbed', e);
			});
		}

		// message.channel.send('hotel? Trivia!');
		let q = trivia[Math.floor(Math.random() * trivia.length)];

		let answersMarkedList = q.answers.map((answer, i) =>
			i === q.correct ?
				`✅ ${numberReactions[i + 1]}**: ${answer}**` :
				`❌ ${numberReactions[i + 1]}: ${answer}`
		).join('\n\n');

		const correctedEmbed = new Discord.MessageEmbed()
			.setTitle(`${q.question}`)
			.setDescription(`${answersMarkedList}`)
			.setColor(tofuGreen);

		const mainEmbed = new Discord.MessageEmbed()
			.setTitle(`${q.question}`)
			.setDescription(`${q.answers.map((e, i) => `${numberReactions[i + 1]}: ${e}`).join('\n\n')}`)
			.setColor(tofuGreen)
			.setFooter(`${message.member.displayName} can reveal the answer in 15s when the ✅ appears. Or wait 1m.`);

		message.channel.send({ embeds: [mainEmbed] }).then(async sentEmbed => {
			for (let i = 1; i <= q.answers.length; i++) {
				// console.log(`${numberReactions.get(i + 1)}`);
				try {
					await sentEmbed.react(`${numberReactions[i]}`);
					const d = async () => new Promise(r => setTimeout(r, 260));
					await d();
				} catch (e) {
					throw new Tantrum(client, 'trivia.js', 'Error on reacting to embed', e);
				}
			}
			setTimeout(async () => {
				const correct = await promptMessage(sentEmbed, message.author, 45, '✅');

				if (correct === '✅') {
					// message.channel.send('YAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAS');
					correctedEmbed.setFooter(`${message.member.displayName} revealed the answer.`);
					sentEmbed.edit({ embeds: [correctedEmbed] }).catch(e => {
						throw new Tantrum(client, 'trivia.js', 'Error on editing message to correctedEmbed', e);
					});
				}
				else {
					// message.channel.send('k')
					correctedEmbed.setFooter('1 minute passed, the answer has been revealed.');
					sentEmbed.edit({ embeds: [correctedEmbed] }).catch(e => {
						throw new Tantrum(client, 'trivia.js', 'Error on editing message to correctedEmbed', e);
					});
				}
			}, 15000);
		}).catch(e => {
			throw new Tantrum(client, 'trivia.js', 'Error on sending mainEmbed', e);
		});
	},
};
