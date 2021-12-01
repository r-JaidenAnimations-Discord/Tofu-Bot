const { tofuBlue } = require('#colors');
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');

module.exports = {
	name: 'listtags',
	helpTitle: 'List tags',
	category: 'Tags',
	usage: 'listtags',
	description: 'Get a list of all tags',
	isDMAllowed: false,
	isDangerous: false,
	mainServerOnly: true,
	isHidden: false,
	aliases: ['tlist', 'tagslist', 'tags-list', 'list-tags', 'taglist', 'tag-list', 'list-tag', 'tags'],
	cooldown: 0,
	execute: async function(client, message, args) {

		const component = new MessageActionRow()
			.addComponents(
				new MessageButton()
					.setCustomId('prev')
					.setLabel('Prev')
					.setStyle('PRIMARY'),
				new MessageButton()
					.setCustomId('next')
					.setLabel('Next')
					.setStyle('PRIMARY')
			);

		// Sorted tags with a "name - by user" format
		const tags = (await client.tags.findAll({
			attributes: ['name', 'username']
		})).sort((a, b) => {
			const nameA = a.name.toUpperCase();
			const nameB = b.name.toUpperCase();
			if (nameA < nameB) return -1;
			if (nameA > nameB) return 1;
			return 0;
		}).map(t => `**${t.name}**` + ' - by ' + t.username);

		/**
		 * Splits an array every x elements
		 * from stackoverflow lolllllll
		 * @param {Array} arr array to split
		 * @param {Number} size Every how much it'll split
		 * @returns {Array}
		 */
		function paginate(arr, size) {
			return arr.reduce((acc, val, i) => {
				const idx = Math.floor(i / size);
				const page = acc[idx] || (acc[idx] = []);
				page.push(val);

				return acc;
			}, []);
		}

		// Current page (args[0] or 0), if it's less it returns
		let curPage = parseInt(args[0]) - 1 || 0;
		if (curPage < 0) return message.channel.send('Please enter a valid page number!');
		const pages = paginate(tags, 10);
		const embed = new MessageEmbed()
			.setTitle('All Tags')
			.setDescription(pages[curPage].join('\n'))
			.setFooter(`Page ${curPage + 1} of ${pages.length}`)
			.setColor(tofuBlue);

		const msg = await message.channel.send({ embeds: [embed], components: [component] });
		const collector = msg.createMessageComponentCollector({
			filter: i => i.user.id == message.author.id,
			idle: 30000
		});
		collector.on('collect', button => {
			switch (button.customId) {
				case 'prev': {
					curPage - 1 < 0 ? curPage = pages.length - 1 : curPage--;
					break;
				}
				case 'next': {
					curPage + 1 >= pages.length ? curPage = 0 : curPage++;
					break;
				}
			}
			embed.setDescription(pages[curPage].join('\n'));
			embed.setFooter(`Page ${curPage + 1} of ${pages.length}`);
			msg.edit({ embeds: [embed] });
			button.reply('this horribleness you have to do').then(() => button.deleteReply());
		});
		collector.on('end', () => {
			msg.edit({ components: [] });
		});

	}
};
