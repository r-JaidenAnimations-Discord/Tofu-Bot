const Discord = require('discord.js');
const { trimRight } = require('ffmpeg-static');

module.exports = {
    name: 'whymaxresigned',
    helpTitle: 'Why Maxim Retired',
    category: 'Misc',
    usage: 'whymaxretired',
    description: 'Let\'s explain that.....',
    isEnabled: true,
    isDeprecated: false,
    aliases: ['whyresign', 'resigned'],
	cooldown: 30,
	execute: async function(client, message, args) {
        message.channel.send('So uh, let\'s explain this. When i got promoted to helper a while back, everything was fine. But once i got mod, i explained that i\'m not ready for it yet. And my concerns weren\'t heard. I *never* felt comfortable. But then i was being pushed to admin. And no, i got pretty upset. That\'s the point i decided, either make me helper, or i quit. Multiple times i asked for it, nothing. Eventually i made a hidden command in tofu that forces the mod role away. And still, some people just smelled role changes. And i was pushed back in. I was considering just leaving, but didn\'t want to do that because i love this place. But this is just wrong. And that\'s why i resigned. I just don\'t feel comfortable being staff.');
	},
};