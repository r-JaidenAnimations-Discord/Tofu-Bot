module.exports = (client, message, query, tracks) => {
	let searchResultString = tracks.map((t, i) => `${i + 1}) ${t.title}`).join('\n');

	message.channel.send(`\`\`\`nim\n${searchResultString}\n\`\`\``);
};
