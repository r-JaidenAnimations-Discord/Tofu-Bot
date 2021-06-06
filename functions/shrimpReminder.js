//const { shrimpID, devMode } = require('../config.json');
const { shrimpID } = require('#memberIDs');
const Tantrum = require('#tantrum');

const remindShrimp = (client) => {
	const { /*shrimpID, */devMode } = client.config;

	let date = new Date();
	let hour = date.getHours();
	//console.log(hour);
	if (hour === '23') {
		try {
			// We don't want potential spamming when doing tests.
			if (devMode === true) {
				console.log('Shrimp reminder triggered, but in development bot');
			} else {
				return client.users.cache.get(shrimpID).send('Time to check on ye boi aussie');
			}
		} catch (e) {
			throw new Tantrum(client, 'shrimpReminder.js', 'Error on sending reminder to shrimp', e);
		}
	}
}

module.exports = {
	remindShrimp
};
