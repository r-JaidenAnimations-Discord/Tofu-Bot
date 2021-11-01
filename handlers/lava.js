const fs = require('fs');

const ascii = require('ascii-table');

let table = new ascii('Music Events');
table.setHeading('Music Event', 'Load Status');

module.exports = client => {
	const player = fs.readdirSync('./events/lava/').filter(file => file.endsWith('.js'));

	for (const file of player) {
		const event = require(`../events/lava/${file}`);
		client.music.on(file.split('.')[0], event.bind(null, client));
		table.addRow(file, '✔   Loaded');
	}

	console.log(table.toString());
};
