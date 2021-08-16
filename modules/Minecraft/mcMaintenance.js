const { masterCheck } = require('#utils/staffChecks.js');
const { updateSetting } = require('#utils/settingsManager.js');

module.exports = {
	name: 'minecraftmaintenance',
	helpTitle: 'Minecraft',
	category: 'Minecraft',
	usage: 'minecraft',
	description: 'Show info about our minecraft server!',
	isDMAllowed: false,
	isDeprecated: false,
	isDangerous: true,
	isHidden: false,
	aliases: ['mcm', 'minecraffmaintenance', 'minecrapmaintenance'],
	cooldown: 0,
	execute: async function(client, message, args) {
		if (!masterCheck(client, message)) return;

		updateSetting(client, message, 'minecraftMaintenance', args[0]);
	},
};
