const Discord = require('discord.js');
const { Op: { like } } = require('sequelize');
const { tofuBlue } = require('#colors');
const { isEven } = require('#utils/isEven.js');
const { getLongestString } = require('#utils/getLongestString.js');
const BlockPaginate = require('#utils/blockPagination.js');

module.exports = {
	name: 'bdays',
	helpTitle: 'Birthdays',
	category: 'Fun',
	usage: `bdays (name)
    bdays add [name] [month] [day]
    bdays remove [name]
	bdays sort {name, date}`,
	description: 'Check the birthdays of someone, sort them, or add and remove birthdays!',
	aliases: ['birthdays'],
	execute: async function(client, message, args) {
		if (!args[1]) { // t+bdays, t+bdays user
			if (!args[0] || args[0] == 'list' || args.join(' ') == 'sort name') { // t+bdays

				const dbData = (await client.birthdays.findAll());
				let longestName = getLongestString(dbData.map(function(e) { return e.name })).length;
				// const users = (await client.birthdays.findAll())
				const users = dbData.sort((a, b) => {
					let nameA = a.name.toUpperCase();
					let nameB = b.name.toUpperCase();
					if (nameA < nameB) return -1;
					if (nameA > nameB) return 1;
					return 0;
				})
					.map(t => t.name.padEnd(longestName + 2, '.') + t.date.toDateString());
				return this.list(message, users);
			} else {
				const user = client.birthdays.findOne({ where: { name: { [like]: args.join(' ') } } });
				if (!user) return message.channel.send('Sorry, there is nothing I can help with here.');
				message.channel.send(`${user.name}'s birthday is in <t:${Math.floor(user.date.getMilliseconds() / 1000)}>'`);
			}
		} else {
			switch (args[0]) {
				case 'add': {
					const user = await client.birthdays.findOne({ where: { name: { [like]: args[1] } } });
					if (user) return message.channel.send('This user has already been added!');
					const date = new Date(args.slice(1).join(' '));
					if (isNaN(date)) return message.channel.send('Invalid date provided.');
					await client.birthdays.create({
						name: args[1],
						date
					});
					message.channel.send(`Added ${args[1]}'s birthday!'`);
					break;
				}
				case 'remove':
				case 'rm':
				case 'del':
				case 'delete': {
					const user = await client.birthdays.findOne({ where: { name: { [like]: args[1] } } });
					if (!user) return message.channel.send('This user doesn\'t exist!');
					await user.destroy();
					message.channel.send(`Deleted ${args[1]}'s birthday entry.`);
					break;
				}
				case 'sort': {
					switch (args[1]) {
						case 'date': {
							const users = (await client.birthdays.findAll())
								.sort((a, b) => a.date - b.date)
								.map(t => t.name + ' - ' + t.date.toDateString());
							this.list(message, users);
							break;
						}
					}
				}
			}
		}
	},

	paginate: function(arr, size) {
		return arr.reduce((acc, val, i) => {
			let idx = Math.floor(i / size);
			let page = acc[idx] || (acc[idx] = []);
			page.push(val);

			return acc;
		}, []);
	},

	list: async function(message, users) {
		// const components = [new Discord.MessageActionRow()
		// .addComponents(
		// 	new Discord.MessageButton()
		// 		.setCustomId('b')
		// 		.setLabel('Back')
		// 		.setStyle('PRIMARY'),
		// 	new Discord.MessageButton()
		// 		.setCustomId('n')
		// 		.setLabel('Next')
		// 		.setStyle('PRIMARY')
		// )];

		// let curPage = 0;

		// let pages = BlockPaginate.createPages(users, 2);

		// let mesag = await message.channel.send(`\`\`\`diff\n${pages[0]}\n\`\`\``);
		// if (pages.length > 1) BlockPaginate.runner(mesag, pages);
		// let pages = this.paginate(users, 10);
		// let embeds = [
		// new Discord.MessageEmbed()
		// .setDescription(pages[curPage].join('\n'))
		// .setFooter(`Page ${curPage + 1} of ${pages.length}`)
		// .setColor(tofuBlue)
		// ];
		let toSend = '**THIS THING IS STILL BROKEN, SORRY**\n```diff\n';
		// users.forEach(e => toSend += `${}${e}\n`)

		for (let i = 0; i < users.length; i++) toSend += `${isEven(i) ? '+' : '='} ${users[i]}\n`;

		toSend += '```';
		message.channel.send(toSend);
		// const msg = await message.channel.send({ embeds, components });
		// const collector = msg.createMessageComponentCollector({
		// 	filter: i => i.user.id == message.author.id,
		// 	idle: 30000
		// });

		// collector.on('collect', button => {
		// 	switch (button.customId) {
		// 		case 'b': {
		// 			if (curPage - 1 < 0) curPage = pages.length - 1;
		// 			else curPage--;
		// 			break;
		// 		}
		// 		case 'n': {
		// 			if (curPage + 1 >= pages.length) curPage = 0;
		// 			else curPage++;
		// 			break;
		// 		}
		// 	}
		// 	embeds[0].setDescription(pages[curPage].join('\n'));
		// 	embeds[0].setFooter(`Page ${curPage + 1} of ${pages.length}`);
		// 	msg.edit({ embeds });
		// 	button.reply('.').then(() => button.deleteReply());
		// });
		// collector.on('end', () => {
		// 	msg.edit({ components: [] });
		// });
	}
};
