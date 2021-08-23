module.exports = {
	releases: [
		/* BOILERPLATE
				{
			version: '',
			aliases: [],
			additions: [],
			fixes: [],
			removals: []
		},
		*/
		{
			version: '1.0.0',
			aliases: ['1', '1.0'],
			additions: [
				'Initital release, so base handlers and commands.'
			],
			fixes: [],
			removals: []
		},
		{
			version: '1.1.0',
			aliases: ['1.1'],
			additions: [
				'Added the BAN_MEMBERS permission requirement on the stream command'
			],
			fixes: [
				'Code cleanups',
				'Fixed bean command',
				'Fixed colors',
				'Fixed credits'
			],
			removals: [
				'Removed unused code'
			]
		},
		{
			version: '1.2.0',
			aliases: ['1.2'],
			additions: [
				'Welcome and bye messages',
				'Custom status'
			],
			fixes: [],
			removals: []
		},
		{
			version: '1.2.1',
			aliases: [],
			additions: [
				'Initial work on trivia command',
				'Kirito trust'
			],
			fixes: [],
			removals: []
		},
		{
			version: '1.3.0',
			aliases: ['1.3'],
			additions: [
				'More quotes to quote command',
				'Trivia command',
				'Fart command (Grady)'
			],
			fixes: [
				'Check whether random status is enabled without actually changing it\'s state',
				'Check whether welcome messages are enabled without actually changing it\'s state',
				'Check for permissions before channel in say command'
			],
			removals: []
		},
		{
			version: '1.4.0',
			aliases: ['1.4'],
			additions: [
				'Ali trust',
				'Oof emote command',
				'Error handling',
				'More quotes',
				'Minecraft command'
			],
			fixes: [
				'Typo in kirito trust',
				'Permission checking in certain places',
				'Locked down fart command'
			],
			removals: [],
		},
		{
			version: '1.4.1',
			aliases: [],
			additions: [
				'Owofy command',
				'Eval command',
				'Maxnoadmin command',
				'Deprecation module',
				'Error handler',
				'Whymaxresigned command'
			],
			fixes: [
				'Fixed crash on minecraft command when server is down',
				'Updated welcome message',
				'Fixed crash on trying to send empty message in say command',
				'Updated \'No command or alias\' error message'
			],
			removals: [],
		},
		{
			version: '1.4.2',
			aliases: [],
			additions: [],
			fixes: [
				'Updated whymaxresigned message'
			],
			removals: [],
		},
		{
			version: '1.5.0',
			aliases: ['1.5'],
			additions: [
				'Added Alphen to about credits',
				'Movie Night suggestions'
			],
			fixes: [
				'Fixed identations'
			],
			removals: [],
		},
		{
			version: '1.5.1',
			aliases: [],
			additions: [
				'Added question to trivia',
				'Added Meme and Grady to credits',
				'Vibecheck command',
				'Reintrocuced DMable commands',
				'More info fields in help command'
			],
			fixes: [
				'Deprecated whymaxresigned command',
				'Fixed eval and final api key leak prevention',
				'Fixed incorrect order of code block in message event',
				'Updated footer messages',
				'Fixed minor typos and code errors',
				'Banned pent from say command',
				'No longer deleting whymaxresigned command usage'
			],
			removals: [
				'Removed emoji commands',
				'Disabled Movie Night suggestions',
				'Removed fart command'
			],
		},
		{
			version: '1.6.0',
			aliases: ['1.6'],
			additions: [
				'Randomized welcome messages',
				'Accidental execution warning on dev server',
				'Trusted server checking',
				'Settings using JSON',
				'New disabled command system that can be updated live (no manual file editing or restarting)',
				'Event handler outputs log in table now',
				'Category field in help command',
				'DM on usage in unauthorized server',
				'Added ratelimit error logger',
				'Added watching random user status (Watches a random user with the oil role (level 20))',
				'Added a reaction when updating the bot status with customstatus is successful.',
				'Added report command'
			],
			fixes: [
				'Fixed capitalized name in command',
				'Fixed small semantic issues',
				'Removed anti pent measures',
				'Refactored ali and kirito trust',
				'Implemented error handler in say command',
				'Finished implementing error handler everywhere',
				'Reworked \'can\'t talk, eating tofu\' DM to accompany DMable commands',
				'Cleaned up no longer used files and moved them to the legacy folder'
			],
			removals: [
				'Removed cooldown on eval command',
				'Removed text manipulation command usage deletion',
				'Removed whymaxresigned',
				'Removed cooldown and command usage deletion on say command'
			],
		},
		{
			version: '1.7.0',
			aliases: ['1.7'],
			additions: [
				'Added Paowee to credits',
				'Added unified formatting using vscode formatter',
				'Added blacklisting',
				'\'a\' command because Shrimp',
				'New, object based error handler (throw a tantrum) for the meme',
				'Maxnoadmin now generates a 1h valid invite'
			],
			fixes: [
				'Status now randomly watches \'you\' or \'Jaiden\'',
				'Fixed various small oversights',
				'Changed link to \'Streaming something\' status',
				'Renamed status command arguments to better ones',
				'Reenabled Movie Night suggestions'
			],
			removals: []
		},
		{
			version: '1.8.0',
			aliases: ['1.8'],
			additions: [
				'Implemented music'
			],
			fixes: [
				'Fixed various oversights',
				'Locked \'a\' commmand to Shrimp and trusted',
				'Await the reactions in trivia',
				'Minor refactors'
			],
			removals: []
		},
		{
			version: '1.8.1',
			aliases: [],
			additions: [
				'Added imnotshrimp command',
				'Added a readme',
				'Fixed color bug in lyrics command',
				'Added missing music aliases',
				'Added music leave command'
			],
			fixes: [
				'Updated dependencies',
				'Lowercase AHAHAHAH in \'a\' command',
				'Fixed music requester bug',
				'Watching \'you\' or \'Jaiden\' in dnd status'
			],
			removals: [
				'Archived movienight.js (test vc thing)',
				'Removed unneeded error handling'
			]
		},
		{
			version: '1.8.2',
			aliases: [],
			additions: [
				'Added more aliases to now playing command'
			],
			fixes: [
				'Fixed error on lyrics smaller than 1024 chars',
				'Update readme (funi)',
				'Pull link directly from config.json instead of minecraft api'
			],
			removals: []
		},
		{
			version: '1.8.3',
			aliases: [],
			additions: [
				'Minecraft maintenance command',
				'Added Shrimp reminder'
			],
			fixes: [
				'Inviting with maxnoadmin is now optional with argument',
				'Minor refactor on playback handler'
			],
			removals: [
				'Disabled responding on ping',
				'Disabled ratalimit log'
			]
		},
		{
			version: '1.8.4',
			aliases: [],
			additions: [
				'Added more info to ready event log'
			],
			fixes: [
				'Disable Shrimp reminder on development bot',
				'Locked \'a\' command to Shrimp only',
				'Fixed small oversight that caused music to not work at all',
				'Refactored minecraft command (it goes brrrr now)',
				'Moved blacklist.json and setting.json to new directory',
				'Fixed error when getting bamboozled',
				'React when sending something with the say command was successful'
			],
			removals: [
				'Removed deleted command from defaults.json'
			]
		},
		{
			version: '1.9.0',
			aliases: ['1.9'],
			additions: [
				'Added ability to load different config files using startup arguments'
			],
			fixes: [
				'Event handler table now properly named',
				'Complete revamp of music, this time using the discord-player module',
				'About command now pulls version string from package.json',
				'Various code fixes (awaits and \'===\''
			],
			removals: [
				'Archived old error handler and removed it\'s commented out calls'
			]
		},
		{
			version: '1.9.1',
			aliases: [],
			additions: [
				'Added opusscript to package.json'
			],
			fixes: [
				'Fixed various bugs in minecraft command',
				'Moved join/leave messages to a JSON file',
				'Reduce the other server warnings to only the \'dangerous\' commands',
				'Fixed undefined bug in help command',
				'Fixed a few typos'
			],
			removals: []
		},
		{
			version: '1.10.0',
			aliases: ['1.10'],
			additions: [
				'Brought back fart command',
				'Added invite disclaimer to maxnoadmin',
				'Auto remove harly role from Max'
			],
			fixes: [
				'Moved colors from the config.jsons to colors.json',
				'Moved member ID\'s from the config.jsons to memberIDs.json',
				'Implemented subpath imports to get rid of long relative paths',
				'Added Wall-E to random status function',
				'Refactored help command with addition of hidden commands'
			],
			removals: []
		},
		{
			version: '1.10.1',
			aliases: [],
			additions: [],
			fixes: [
				'Refactored dangerous command handling',
				'Marked eval as dangerous',
				'Refactored statusFunction',
				'Added another little API key leak prevention',
				'Remove old commented out code',
				'Added a little exam focus aid for Max'
			],
			removals: []
		},
		{
			version: '1.11.0',
			aliases: ['1.11'],
			additions: [
				'Implemented pluralisation',
				'Added tags',
				'Death to .DS_Store',
				'Added databased Movie Night suggestions with approval, denial, etc',
				'Added new staff checking system',
				'Started adding JSDoc'
			],
			fixes: [
				'Time formatting on the command cooldown message'
			],
			removals: [
				'Remove old abandoned code',
				'Remove log of the entire minecraft API response'
			]
		},
		{
			version: '1.11.1',
			aliases: [],
			additions: [],
			fixes: [
				'Remove staff check from suggest movie command'
			],
			removals: []
		},
		{
			version: '1.11.2',
			aliases: [],
			additions: [],
			fixes: [
				'Refactored custom status',
				'Refactored statusFunction',
				'Bumped deps (fixed youtube api break)',
				'Cleaned minecraft command code'
			],
			removals: []
		},
		{
			version: '1.12.0',
			aliases: ['1.12'],
			additions: [
				'Added joke command',
				'Added dog command',
				'Added master check to staff checks',
				'Added music remove command',
				'Added music back command',
				'Added more JSDoc to the code',
				'Reworked about command (eg. moved hardcoded memberIDs to memberIDs.json',
				'Added live stream music support',
				'Renamed functions dir to utils',
				'Added changelog command'
			],
			fixes: [
				'Restructured database handling',
				'Fixed mass ping vulnerability on bean command',
				'Refactored error handling',
				'Code cleanups',
				'Refactored minecraft command',
				'Mildly refactored kirito and ali trust'
			],
			removals: [
				'Removed Max focus aid'
			]
		},
		{
			version: '1.12.1',
			aliases: [],
			additions: [],
			fixes: [
				'Fixed error when using search command',
				'Fixed taginfo not working',
				'Cleaned up joke and dog pic command',
				'Bumped discord-player'
			],
			removals: []
		},
		{
			version: '1.12.2',
			aliases: [],
			additions: [],
			fixes: [
				'Fixed \'TypeError: Cannot read property \'replace\' of undefined\' error in eval',
				'Updated deps'
			],
			removals: []
		},
		{
			version: '2.0.0',
			aliases: ['2', '2.0'],
			additions: [
				'Interactive buttons',
				'Slash commands',
				'Intents and partials',
				'jsconfig.json for subpath import intellisense',
				'Settings manager',
				'Autoresponders',
				'Both looping current track and queue',
				'Staff only tags',
				'Considered option and more info in movie night suggestions',
				'Thread support',
				'Open Sourced at v2 release! (Aug 16 2021)'
			],
			fixes: [
				'Complete overhaul to DJS master branch (upcoming DJS 13) *(This is a single line but really took days of work so yes)*',
				'Refactored trivia',
				'Cleaned up minecraft command',
				'Refactored messageCreate event',
				'Refactored cooldowns',
				'Refactor buildTimeString',
				'Reworked settings with settings manager',
				'Fixed \'Can\'t talk\' DM message',
				'Fixed \'TypeError: Cannot read property \'replace\' of undefined\' error in eval',
				'Embedify already enabled/disabled message in settings',
				'Restructured files and assets',
				'Move databases to deployData',
				'More simple counter in cooldown message',
				'Embedify command already enabled/disabled message'
			],
			removals: [
				'Shrimp reminder'
			]
		},
		{
			version: '2.1.0',
			aliases: ['2.1'],
			additions: [
				'Open source messages',
				'GitHub sponsor button',
				'Vibecheck slashie',
				'Acknowledgements file'
			],
			fixes: [
				'Renamed eval to evil',
				'Fixed incorrect string when using certain commands without permissions',
				'Reduced timeout between reactions on promptMessage',
				'Clean up error handling in index.js',
				'Refactor pluralize util',
				'Delete some old commented out code and stuff',
				'Add guild argument on publishInteractions',
				'Manually append name on vibecheck command',
				'Remodeled about embed',
				'Remove database overhaul return (no wonder noone can create tags)',
				'Remove \'early dev\' stuff from readme'
			],
			removals: []
		},
		{
			version: '2.2.0',
			aliases: ['2.2'],
			additions: [
				'Voice Channel activities'
			],
			fixes: [
				'Fixed indentation on vibecheck slashie'
			],
			removals: []
		},
		{
			version: '2.2.1',
			aliases: [],
			additions: [
				'GitHub actions CI eslint checking',
				'Eslint config and stuffs',
			],
			fixes: [
				'Changed loading string on dog command to global string',
				'Changed ban perm check to message perm check on movie night suggestion management commands'
			],
			removals: []
		},
		{
			version: '2.2.2',
			aliases: [],
			additions: [
				'Bot status slashie'
			],
			fixes: [
				'Start enforcing LF eol sequence',
				'Fixed mistakes in GitHub CI workflow yml'
			],
			removals: []
		},
		{
			version: '2.3.0',
			aliases: ['2.3'],
			additions: [
				'Main server only option (hides and disables commands in other servers)',
				'Maintenance downtime notifier (let people know when bot goes down soon)',
				'Custom array protoype for random element',
				'Random loading messages',
				'Lyrics command',
				'Seek command',

			],
			fixes: [
				'Moved contribution guidelines from readme to separate file',
				'Fix linting errors',
				'Ignore files in ./modules directory (finally .DS_Store no longer messes up my bot)',
				'Clean up help command and fix alias',
				'Fix typo in interaction event',
				'Disabled poker night activity (18+ so bad)',
				'Refactored master check',
				'Refactored Tantrum',
				'Renamed newSuggestMovie.js to suggestionAdd.js',
				'Lowercase message before checking for prefix (mobile users you\'re welcome)',
				'Fix return on movie suggestion create command to make it usable again'
			],
			removals: [
				'Remove package-lock from repo',
				'Report system and notify users'
			]
		},
	]
};
