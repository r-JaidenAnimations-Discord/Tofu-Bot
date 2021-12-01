// Event handler is very broken, | not anymore!!!!!!!!!!!!!!!!!!!!!!!!

const fs = require('fs'); // fs is the package we need to read all files which are in folders

const ascii = require('ascii-table');

const table = new ascii('Events');
table.setHeading('Event', 'Load Status');

module.exports = client => {
	const load = dirs => {
		const events = fs.readdirSync(`./events/${dirs}/`).filter(d => d.endsWith('.js'));
		for (const file of events) {
			const evt = require(`../events/${dirs}/${file}`);
			const eName = file.split('.')[0];
			client.on(eName, evt.bind(null, client));
			// console.log(eName + ' loaded');
			table.addRow(eName, '✔   Loaded');
		}
	};
	['client', 'guild'].forEach(x => load(x));
	console.log(table.toString());
};
// wait might run be because the module export of the event has to be different too?
// don't know how bind works with object methods x d
