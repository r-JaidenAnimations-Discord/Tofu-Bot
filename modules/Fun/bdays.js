const { Op: { like } } = require('sequelize');
const { isEven } = require('#utils/isEven.js');
const { getLongestString } = require('#utils/getLongestString.js');
const BlockPaginate = require('#utils/blockPagination.js');
const { firesObjectifier } = require('#utils/firesObjectifier.js');

module.exports = {
	name: 'bdays',
	helpTitle: 'Birthdays',
	category: 'Fun',
	usage: `bdays (name)
    bdays add [name] [month] [day]
    bdays remove [name]
	bdays sort {name, date}`,
	description: 'Check the birthdays of someone, sort them, or add and remove birthdays!',
	isDMAllowed: false,
	isDangerous: false,
	mainServerOnly: true,
	isHidden: false,
	aliases: ['birthdays', 'bd'],
	cooldown: 0,
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
					.map(t => {
						const date = new Date(t.date);
						return `${t.name.padEnd(longestName + 2, '.')}${firesObjectifier(date.getDate())} ${date.toLocaleString('default', { month: 'long' })}`;
					});
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
							const dbData = (await client.birthdays.findAll());
							let longestName = getLongestString(dbData.map(function(e) { return e.name })).length;

							const users = dbData.sort((a, b) => a.date - b.date)
								.map(t => {
									const date = new Date(t.date);
									return `${t.name.padEnd(longestName + 2, '.')}${firesObjectifier(date.getDate())} ${date.toLocaleString('default', { month: 'long' })}`;
								});
							this.list(message, users);
							break;
						}
					}
				}
			}
		}
	},

	list: async function(message, users) {
		let pages = BlockPaginate.createPages(users, 25);
		const formattedPages = [];

		pages.forEach(page => formattedPages.push(this.format(page)));

		let mesag = await message.channel.send(`${formattedPages[0]}${formattedPages.length > 1 ? `\nPage 1 of ${formattedPages.length}` : ''}\`\`\``);
		if (formattedPages.length > 1) BlockPaginate.runner(mesag, formattedPages, message.author);
	},

	format: function(page) {
		let block = '```diff\n';
		for (let i = 0; i < page.length; i++) block += `${isEven(i) ? '+' : '='} ${page[i]}\n`;
		return block;
	}
};
