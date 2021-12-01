const { maxID } = require('#memberIDs');
const chalk = require('chalk');

/**
 * Clears and publishes the bot's slash commands to a given guild ID
 * @param {Client} client Discord client object
 * @param {String} guild Guild ID to publish slashies to
 */
const publishInteractions = async (client, guild) => {
	await client.guilds.cache.get(guild).commands.set([]); // Reset all the command data
	for (const interaction of [...client.interactions.filter(({ data: { name } }) => !client.config.disabledInteractions.includes(name)).values()]) {
		const command = await client.guilds.cache.get(guild).commands.create(interaction.data);
		// a thing to know: add staffOnly AND set data.defaultPermission to false
		if (interaction.staffOnly) command.permissions.add({
			permissions: [
				{ id: '756585204344291409', type: 'ROLE', permission: true }, // Staff
				{ id: '775665978813054986', type: 'ROLE', permission: true }, // Helpers
				{ id: '755094113358970900', type: 'ROLE', permission: true }, // Moderators
				{ id: '755093779282657342', type: 'ROLE', permission: true }, // Administrators
				{ id: maxID, type: 'USER', permission: true } // Me
			]
		});
		else if (interaction.permissions) command.permissions.add({ permissions: interaction.permissions });
	}
	console.info(`${chalk.green('[Info]')}:`, 'Slashies have been (re)published successfully!');
};

module.exports = {
	publishInteractions
};
