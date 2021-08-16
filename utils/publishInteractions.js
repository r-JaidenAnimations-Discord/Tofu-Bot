const { maxID } = require('#memberIDs');
const chalk = require('chalk');

const publishInteractions = async (client) => {
	try {
		await client.guilds.cache.get(client.config.jaidenServerID).commands.set([]); // Reset all the command data
		for (let interaction of [...client.interactions.filter(({ data: { name } }) => !client.config.disabledInteractions.includes(name)).values()]) {
			const command = await client.guilds.cache.get(client.config.jaidenServerID).commands.create(interaction.data);
			// a thing to know: add staffOnly AND set data.defaultPermission to false
			if (interaction.staffOnly) command.permissions.add({
				permissions: [
					{ id: '756585204344291409', type: 'ROLE', permission: true }, // Staff
					{ id: '775665978813054986', type: 'ROLE', permission: true }, // Helpers
					{ id: '755094113358970900', type: 'ROLE', permission: true }, // Moderators
					{ id: '755093779282657342', type: 'ROLE', permission: true }, // Administrators
					{ id: maxID, type: 'USER', permission: true }  // Me
				]
			});
			else if (interaction.permissions) command.permissions.add({ permissions: interaction.permissions });
		}
		console.info(chalk.green('[Info]:'), 'Slashies have been (re)published successfully!');
	} catch (e) {
		console.error(e);
	}
}


module.exports = {
	publishInteractions
}
