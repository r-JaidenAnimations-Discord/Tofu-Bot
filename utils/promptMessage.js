//Plagiarized from tera, like 90% of this codebase

/**
* Sends a message (prompt) with X reactions, the bot will take action depending on the chosen reaction.
* @param {Discord.Message} message The Message object to perform actions using message
* @param {Discord.User|Discord.GuildMember} author The author of the message, so that actions only perform based on theirs
* @param {Number} time Prompt message expiration time in seconds
* @param {Array} validReactions Array with reactions the bot will listen to
*/
async function promptMessage(message, author, time, validReactions) {
	time *= 1000;

	for (const reaction of validReactions) await message.react(reaction);

	const filter = (reaction, user) => validReactions.includes(reaction.emoji.name) && user.id === author.id;

	return message
		.awaitReactions(filter, { max: 1, time: time })
		.then(collected => collected.first() && collected.first().emoji.name);
}

module.exports = {
	promptMessage
};
