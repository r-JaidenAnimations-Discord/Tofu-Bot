module.exports = {
	name: 'whymaxresigned',
	helpTitle: 'Why Maxim Retired',
	category: 'Misc',
	usage: 'whymaxretired',
	description: 'Let\'s explain that.....',
	isEnabled: true,
	isDeprecated: true,
	aliases: ['whyresign', 'resigned'],
	cooldown: 30,
	execute: async function(client, message, args) {
		message.channel.send('So uh, let\'s explain this.\nWhen I got promoted to helper a while back, everything was fine. But once i got mod, I explained that I wasn\'t ready for it yet. And my concerns weren\'t heard. I didn\'t feel ready until the point I resigned actually. Mainly because I didn\'t get the mod style just yet. But then I was being pushed to admin. Which I heavily protested against.\nThat\'s the point I decided, either make me helper, or I quit. Multiple times i asked for it, nothing. Eventually I made a hidden command in tofu that forces the mod role away. (the hidden tfix command)\nAnd still, some people just smelled role changes. And I was pushed back in. I was considering just leaving, but didn\'t want to do that because I love this place. And that\'s why I resigned. I just didn\'t feel comfortable being mod.\nTrough some tricking my role was eventually removed. I might come back, maybe not. But I won\'t accept anything higher than helper. And will use Tofu to enforce that if needed, until I do feel comfortable.');
	},
};