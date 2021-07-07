const ascii = require('ascii-table');
const fs = require('fs');

let table = new ascii('Interaction');
table.setHeading('Interaction', 'Status');

/**
 * Requires and triggers a command from the ./interactions/ directory when it is inputed by a user next to the prefix.
 * Not included in this file but in `index.js`, but there also is a collection with all commands at the time of node.
 * If a user inputs a wrong command (incorrect command.name) it will not trigger anything.
 * @param {Client} client The bot as a Client object
 */
module.exports = client => {
	const commands = fs.readdirSync('./interactions/').filter(file => file.endsWith('.js'));
	for (let file of commands) {
		let pull = require(`../interactions/${file}`);
		checkData(client, pull, file);
	}
	console.log(table.toString());
};

/**
 * Checks if a command has all what's needed for it to have. Return one string if it does, return other if it doesn't
 */
function checkData(client, command, fileName) {
	const
		success = '✔   Loaded',
		err = '✖   Missing Data';

	const { data, execute } = command;
	if (
		typeof data == 'object' &&
		typeof data?.name == 'string' &&
		typeof data?.description == 'string' &&
		typeof execute == 'function'
	) {
		client.interactions.set(command.data.name.toLowerCase(), command);
		return table.addRow(fileName, success);
	}
	return table.addRow(fileName, err);
}
