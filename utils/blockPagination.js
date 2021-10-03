class BlockPaginate {

	static createPages(arr, size) {
		return arr.reduce((acc, val, i) => {
			let idx = Math.floor(i / size);
			let page = acc[idx] || (acc[idx] = []);
			page.push(val);

			return acc;
		}, []);
	}

	static runner(msg, pages) {
		const d = async () => new Promise(r => setTimeout(r, 260));
		const emojis = ['⬅️', '➡️'];
		let curPage = 0;

		emojis.forEach(async e => {
			msg.react(e);
			await d();
		});

		const filter = (reaction, user) => emojis.includes(reaction.emoji.name) && user.id === msg.author.id;
		const collector = msg.createReactionCollector({
			filter,
			idle: 30000
		});

		collector.on('collect', async (reaction) => {
			// await reaction.users.remove(msg.author);
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

			msg.edit(`\`\`\`diff${pages[curPage].join('\n')}\n\nPage ${curPage + 1} of ${pages.length}\n\`\`\``);

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
