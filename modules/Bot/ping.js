const Discord = require('discord.js');

module.exports = {
    name: 'ping',
    helpTitle: 'Ping',
    category: 'Bot',
    usage: 'ping',
    description: 'Ping!',
    isEnabled: true,
    isDeprecated: false,
    aliases: ['delay', 'latency'],
	cooldown: 5,
	execute: async function(client, message, args) {
        const msg = await message.channel.send('Pinging...');

        msg.edit(`Pong!\nLatency: ${Math.floor(msg.createdAt - message.createdAt)}ms\nAPI Latency (Bot): ${client.ws.ping}ms`);
	},
};