const { releases } = require('#assets/commandChangelog/changelogDB.js');

module.exports = {
	name: 'changelog',
	helpTitle: 'Changelog',
	category: 'Bot',
	usage: 'changelog ({specific version, list})',
	description: 'See what we have been up to',
	isDMAllowed: false,
	isDeprecated: false,
	isDangerous: false,
	isHidden: false,
	aliases: ['cl', 'changes'],
	cooldown: 1,
	execute: async function(client, message, args) {
		if (args[0] === 'list') {
			let versionList = '';
			for (let i = 0; i < releases.length; i++) versionList += '`' + releases[i].version + '`    ';
			return message.channel.send(`All releases:\n${versionList}`);
		}

		const release = args[0] ? releases.find(({ version }) => version === args[0]) || releases.find(({ aliases }) => aliases.includes(args[0])) : releases[releases.length - 1];

		if (!release) return message.channel.send('Couldn\'t find any releases matching your query...');

		let additionList = '';
		let fixList = '';
		let removalList = '';

		for (let m = 0; m < release.additions.length; m++) additionList += '+ ' + release.additions[m] + '\n';
		for (let a = 0; a < release.fixes.length; a++) fixList += '✓ ' + release.fixes[a] + '\n';
		for (let x = 0; x < release.removals.length; x++) removalList += '- ' + release.removals[x] + '\n';

		const log = `**Tofu Bot ${release.version}${release === releases[releases.length - 1] ? ' (Latest)' : ''}**\nChanges:\n\`\`\`diff\n${additionList}${fixList}${removalList}\n\`\`\``;

		message.channel.send(log);
	},
};
