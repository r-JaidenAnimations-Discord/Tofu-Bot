const { shrimpID } = require('#memberIDs');

module.exports = {
	data: {
		name: 'a',
		description: 'a.'
	},
	execute: async (client, interaction) => {
		if (interaction.member.id !== shrimpID) return await interaction.reply('You ain\'t the one');
		await interaction.reply('a.');
	}
};
