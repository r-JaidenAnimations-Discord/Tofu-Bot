const Tantrum = require('#tantrum');

module.exports = (client, message, query, tracks) => {
	let searchResultString = tracks.map((t, i) => `${i + 1}) ${t.title}`).join('\n');

	message.channel.send(`\`\`\`nim\n${searchResultString}\n\`\`\``).catch(e => {
		throw new Tantrum(client, 'searchResults.js', 'Error on sending searchResults');
	});
};
