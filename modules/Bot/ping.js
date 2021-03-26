//const Discord = require('discord.js');
const { handleError } = require('../../functions/errorHandler.js');

module.exports = {
	name: 'ping',
	helpTitle: 'Ping',
	category: 'Bot',
	usage: 'ping',
	description: 'Ping!',
	isDMAllowed: true,
	isDeprecated: false,
	aliases: ['delay', 'latency'],
	cooldown: 5,
	execute: async function(client, message, args) {
		try {
			const msg = await message.channel.send('Pinging...');
			try {
				msg.edit(`Pong!\nLatency: ${Math.floor(msg.createdAt - message.createdAt)}ms\nAPI Latency (Bot): ${client.ws.ping}ms`);
			} catch (e) {
				handleError(client, 'ping.js', 'Error on editing ping message', e);
			}
		} catch (e) {
			handleError(client, 'ping.js', 'Error on sending ping message', e);
		}
	},
};
