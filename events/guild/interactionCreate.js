const { notifyMaintenance } = require('#utils/maintenanceNotifier.js');

module.exports = async (client, interaction) => {
	if (!interaction.member || interaction.member.partial) interaction.member = await interaction.guild.members.fetch(message);
	if (client.config.maintenance) notifyMaintenance(interaction);
	if (interaction.isCommand()) client.interactions.get(interaction.commandName).execute(client, interaction);
};
