class Pagination {
	/**
	 * Splits up a long string into an array of shorter strings with a given max length
	 * @param {String} string Long string to split up into chunks
	 * @param {Number} size Max length per chunk
	 * @returns {Array} Array of strings with a max length of size
	 */
	static generateChunks(string, size) {
		const temp = [];
		for (let i = 0; i < string.length; i += size) temp.push(string.slice(i, i + size));
		return temp;
	}

	static get paginationEmojis() {
		return ['◀', '⛔', '▶'];
	}

	/**
	 * Pagination runner func
	 * @param {Message} msg Sent message object
	 * @param {User} author Message author
	 * @param {Array} chunks The chunks that will become different pages
	 * @param {Boolean} toInit Whether the pagination thing needs to be initialized (add reactions)
	 * @param {Number} currPage Which chunk is currently visible
	 */
	static async paginate(msg, author, chunks, toInit = true, currPage = 0) {
		const d = async () => new Promise(r => setTimeout(r, 260));

		if (toInit) for (const emoji of this.paginationEmojis) {
			await msg.react(emoji);
			await d();
		}

		const filter = (reaction, user) => this.paginationEmojis.includes(reaction.emoji.name) && user.id === author.id;

		const collector = msg.createReactionCollector({ filter, max: 1, idle: 10000 });

		collector.on('collect', async (reaction) => {
			await reaction.users.remove(author);
			await d(); // Wait before continuing to avoid ratelimits

			const emoji = reaction.emoji.name;
			if (emoji === this.paginationEmojis[0]) currPage--;
			if (emoji === this.paginationEmojis[1]) {
				await d();
				return await msg.reactions.removeAll();
			}
			if (emoji === this.paginationEmojis[2]) currPage++;
			currPage = ((currPage % chunks.length) + chunks.length) % chunks.length;

			const embed = msg.embeds[0].setDescription(chunks[currPage]).setFooter(`Page ${currPage + 1} of ${chunks.length}.`);

			msg.edit({ embeds: [embed] });

			this.paginate(msg, author, chunks, false, currPage); // If not stopped, restarts a new collector
		});
		collector.on('end', async (_, reason) => {
			if (['user', 'idle'].includes(reason)) {
				await d();
				await msg.reactions.removeAll();
			}
		});
	}
}

module.exports = Pagination;
