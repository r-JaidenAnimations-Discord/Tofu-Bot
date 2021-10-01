const { MessageActionRow, MessageButton } = require('discord.js');
const { Op: { like }} = require('sequelize');

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
				const users = (await client.birthdays.findAll())
					.sort((a, b) => {
						let nameA = a.name.toUpperCase();
						let nameB = b.name.toUpperCase();
						if (nameA < nameB) return -1;
						if (nameA > nameB) return 1;
						return 0;
					})
					.map(t => bold(t.name) + ' - ' + t.date.toDateString());
				return this.list(message, users);
			} else {
				const user = client.birthdays.findOne({ where: { name: { [like]: args.join(' ') } }});
				if (!user) return message.channel.send('Sorry, there is nothing I can help with here.');
				message.channel.send(`${user.name}'s birthday is in <t:${Math.floor(user.date.getMilliseconds() / 1000)}>'`);
			}
		} else {
			switch (args[0]) {
				case 'add': {
					const user = await client.birthdays.findOne({ where: { name: { [like]: args[0] } }});
					if (user) return message.channel.send('This user has already been added!');
					const date = new Date(args.slice(1).join(' '));
					if (isNaN(date)) return message.channel.send('Invalid date provided.');
					await client.birthdays.create({
						name: args[0],
						date
					});
					message.channel.send(`Added ${args[0]}'s birthday!'`);
					break;
				}
				case 'remove': {
					const user = await client.birthdays.findOne({ where: { name: { [like]: args[0] } }});
					if (!user) return message.channel.send('This user doesn\'t exist!');
					await user.destroy();
					message.channel.send(`Deleted ${args[0]}'s birthday entry.'`);
					break;
				}
				case 'sort': {
					switch (args[1]) {
						case 'date': {
							const users = (await client.birthdays.findAll())
								.sort((a, b) => a.date - b.date)
								.map(t => bold(t.name) + ' - ' + t.date.toDateString());
							this.list(message, users);
							break;
						}
					}
				}
			}
		}
		
	},

	paginate: (arr, size) => {
		return arr.reduce((acc, val, i) => {
			let idx = Math.floor(i / size);
			let page = acc[idx] || (acc[idx] = []);
			page.push(val);
		  
			return acc;
		}, []);
	},

	list: async (message, users) => {
		const components = [ new MessageActionRow()
			.addComponents(
				new MessageButton()
					.setCustomId('b')
					.setLabel('Back')
					.setStyle('PRIMARY'),
				new MessageButton()
					.setCustomId('n')
					.setLabel('Next')
					.setStyle('PRIMARY')
			) ];

		let pages = paginate(users, 10);
		let embeds = [
			new MessageEmbed()
				.setDescription(pages[curPage].join('\n'))
				.setFooter(`Page ${curPage+1} of ${pages.length}`)
				.setColor(SteelBlue)
		];

		const msg = await message.channel.send({ embeds, components });
        		const collector = msg.createMessageComponentCollector({
            		filter: i => i.user.id == message.author.id,
            		time: 5 * 60 * 1000
        		});

		collector.on('collect', button => {
			switch (button.customId) {
				case 'b': {
					if (curPage - 1 < 0) curPage = pages.length - 1;
					else curPage--;
					break;
				}
				case 'n': {
					if (curPage + 1 >= pages.length) curPage = 0;
					else curPage++;
					break;
				}
			}
			embeds[0].setDescription(pages[curPage].join('\n'));
			embeds[0].setFooter(`Page ${curPage+1} of ${pages.length}`);
			msg.edit({ embeds });
			button.reply('.').then(() => button.deleteReply());
		});
	}
};