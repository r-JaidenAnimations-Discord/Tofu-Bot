const { shrimpID } = require('#memberIDs');
const Tantrum = require('#tantrum');

/**
 * Sends a DM to shrimp when it is 11PM
 * @param {Client} client Discord client
 */
const remindShrimp = (client) => {
	const { devMode } = client.config;

	let date = new Date();
	let hour = date.getHours();
	//console.log(hour);
	if (hour === '23') {
		// We don't want potential spamming when doing tests.
		if (devMode === true) return console.log('Shrimp reminder triggered, but in development bot');
		return client.users.cache.get(shrimpID).send('Time to check on ye boi aussie').catch(e => {
			throw new Tantrum(client, 'shrimpReminder.js', 'Error on sending reminder to shrimp', e);
		});

	}
}

module.exports = {
	remindShrimp
};
