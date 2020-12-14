module.exports = {
    name: 'avatar',
    helpTitle: 'Avatar',
    category: 'User Tools',
    usage: 'avatar (@user/ID)',
    description: 'Get the avatar from a user',
    guildOnly: true,
    isEnabled: false,
    aliases: ['icon', 'profile', 'pfp'],
	cooldown: 5,
	execute: async function(client, message, args) {

        if (!message.mentions.users.size) {
            const attach = message.author.avatarURL();
            message.channel.send('Your avatar:', {files: [message.author.avatarURL()]});
        }
        const avatarList = message.mentions.users.map(user => {
            message.channel.send(`${user.username}'s avatar:`, {files: [user.displayAvatarURL()]});
        });
	},
};