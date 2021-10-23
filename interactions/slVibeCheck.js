const Tantrum = require('#tantrum');

module.exports = {
	data: {
		name: 'vibecheck',
		description: 'Are you vibin?',
		options: [{
			name: 'user',
			description: 'Check if someone else is vibin',
			type: 'USER',
			required: false
		}]
	},
	execute: async (client, interaction) => {
		const user = interaction.options.get('user')?.value || interaction.member.id;

		if (Math.floor(Math.random() * 10 > 3))
			interaction.reply(`<@${user}> is vibin!`);
		else {
			interaction.reply(`<@${user}> is not vibin!`);
		}
	}
};
