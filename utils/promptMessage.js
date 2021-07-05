//Plagiarized from tera, like 90% of this codebase

/**
* Sends a message (prompt) with X reactions, the bot will take action depending on the chosen reaction.
* @param {Message} message The Message object to perform actions using message
* @param {User|GuildMember} author The author of the message, so that actions only perform based on theirs
* @param {Number} time Prompt message expiration time in seconds
* @param {Array} validReactions Array with reactions the bot will listen to
*/
async function promptMessage(message, author, time, ...validReactions) {
	time *= 1000;

	for (const reaction of validReactions) {
		message.react(reaction);
		// eslint-disable-next-line no-inner-declarations
		const d = async () => new Promise(r => setTimeout(r, 1000));
		await d();
	}

	const filter = (reaction, user) => validReactions.includes(reaction.emoji.name) && user.id === author.id;

	return message
		.awaitReactions({ filter, time, max: 1 })
		.then(collected => collected.first() && collected.first().emoji.name);
}

module.exports = {
	promptMessage
};
