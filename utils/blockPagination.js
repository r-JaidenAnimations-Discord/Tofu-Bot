class BlockPaginate {
	/**
	 * Split a long array into multiple smaller arrays
	 * @param {Array} arr array to split up
	 * @param {Number} size split up array every x items
	 * @returns {Array} array of split up items ('pages')
	 */
	static createPages(arr, size) {
		return arr.reduce((acc, val, i) => {
			const idx = Math.floor(i / size);
			const page = acc[idx] || (acc[idx] = []);
			page.push(val);

			return acc;
		}, []);
	}

	/**
	 * Creates a reaction controller to a sent message
	 * @param {Object} msg message to run the collector on
	 * @param {Array} pages pages to switch trough
	 * @param {Object} author message author
	 */
	static runner(msg, pages, author) {
		const d = async () => new Promise(r => setTimeout(r, 260));
		const emojis = ['⬅️', '➡️'];
		let curPage = 0;

		emojis.forEach(async e => {
			msg.react(e);
			await d();
		});

		const filter = (reaction, user) => emojis.includes(reaction.emoji.name) && user.id === author.id;
		const collector = msg.createReactionCollector({
			filter,
			idle: 30000
		});

		collector.on('collect', async (reaction) => {
			await reaction.users.remove(author);
			await d(); // Wait before continuing to avoid ratelimits

			switch (reaction.emoji.name) {
				case '⬅️':
					curPage - 1 < 0 ? curPage = pages.length - 1 : curPage--;
					break;
				case '➡️':
					curPage + 1 >= pages.length ? curPage = 0 : curPage++;
					break;
				default:
					throw new Error('Invalid emoji!!!! HOW TF DID THIS HAPPEN??');
			}

			msg.edit(`${pages[curPage]}\nPage ${curPage + 1} of ${pages.length}\n\`\`\``);

		});
		collector.on('end', async (_, reason) => {
			if (['user', 'idle'].includes(reason)) {
				await d();
				await msg.reactions.removeAll();
			}
		});
	}
}

module.exports = BlockPaginate;
