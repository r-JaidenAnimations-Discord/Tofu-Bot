module.exports = async (client, interaction) => {
	if (!interaction.member || interaction.member.partial) xinteraction.member = await interaction.guild.members.fetch(message);

	if (interaction.isCommand()) client.interactions.get(interaction.commandName).execute(client, interaction);
};
