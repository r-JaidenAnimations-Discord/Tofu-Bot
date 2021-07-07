const chalk = require('chalk');

const publishInteractions = async (client) => {
	try {
		for (let interaction of client.interactions.array()) {
			const command = await client.guilds.cache.get(client.config.jaidenServerID).commands.create(interaction.data); //.delete(commandID)

			// a thing to know: add staffOnly AND set data.defaultPermission to false
			// if (interaction.staffOnly) command.permissions.add({
			//     permissions: [
			//         { id: '756585204344291409', type: 'ROLE', permission: true }, // Staff
			//         { id: '775665978813054986', type: 'ROLE', permission: true }, // Helpers
			//         { id: '755094113358970900', type: 'ROLE', permission: true }, // Moderators
			//         { id: '755093779282657342', type: 'ROLE', permission: true }, // Administrators
			//         { id: '558264504736153600', type: 'USER', permission: true }  // Me
			//     ]
			// });
			// else if (interaction.permissions) command.permissions.add({ permissions: interaction.permissions });
		}
		console.info(chalk.green('[Info]'), 'Commands\' data has been republished');
	} catch (e) {
		console.error(e);
	}
}

module.exports = {
	publishInteractions
}
