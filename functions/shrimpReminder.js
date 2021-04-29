const { shrimpID } = require('../config.json');
const Tantrum = require('./tantrum.js');

const remindShrimp = (client) => {
	let date = new Date();
	let hour = date.getHours();
	//console.log(hour);
	if (hour == '23') {
		try {
			return client.users.cache.get(shrimpID).send('Time to check on ye boi aussie');
		} catch (e) {
			throw new Tantrum(client, 'shrimpReminder.js', 'Error on sending reminder to shrimp', e);
		}
	}
}

module.exports = {
	remindShrimp
};
