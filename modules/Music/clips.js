const fs = require('fs');
const Tantrum = require('../../functions/tantrum.js');

module.exports = {
	name: 'clips',
	helpTitle: 'Clips',
	category: 'Music',
	usage: 'clips',
	description: 'View a list of available clips',
	isDMAllowed: false,
	isDeprecated: false,
	//aliases: [],
	cooldown: 0,
	execute: async function(client, message, args) {
		fs.readdir('./commanddata/musicClips', function(err, files) {
			if (err) {
				try {
					new Tantrum(client, 'clips.js', 'Error on reading directory', err);
					message.channel.send('Sorry, something went very wrong, Max has been notified');
					return;
				} catch (e) {
					throw new Tantrum(client, 'clips.js', 'Error on sending readDir error', e);
				}
			}

			let clips = [];

			files.forEach(function(file) {
				clips.push(file.substring(0, file.length - 4));
			});

			try {
				message.channel.send(`Available clips: ${clips.join(' ')}`);
			} catch (e) {
				throw new Tantrum(client, 'clips.js', 'Error on sending clip list', e);
			}
		});
	},
};
