const { tofuRed } = require('#colors');
const Discord = require('discord.js');
const { promptMessage } = require('#utils/promptMessage.js');

const dangerCommandPrompt = (client, message) => {
	const warnEmbed = new Discord.MessageEmbed()
		.setColor(tofuRed)
		.setAuthor(message.author.tag, message.member.user.displayAvatarURL({ format: 'png', size: 4096, dynamic: true }))
		.setTitle('HOLD UP')
		.setDescription('This is a **__dangerous__** command. It affects the main server, are you absolutely sure you want to continue?')
		.setTimestamp();

	return message.channel.send(warnEmbed).then(async msg => {
		const emoji = await promptMessage(msg, message.author, 30, ['✅', '❌']);

		if (emoji === '✅') {
			msg.delete();
			message.channel.send('Done, you were warned');
			return true;
		} else if (emoji === '❌') {
			msg.delete();
			message.channel.send('Okay');
			return false;
		}
		else {
			// No reactions
			return false;
		}
	});
}

module.exports = {
	dangerCommandPrompt
};
